const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASS;
import * as http from "http";

function adduser(username:string, password:string, done) : void {
    add_or_update_user(username, password, err => {
        if (err) {
            done(err);
        } else {
            create_database_for_user(username, done);
        }
    }, null);
    
}

function updateuser(username: string, newPassword:string, done) : void {
    get_user(username, (err, user_object) => {
        if (err) {
            done(err);
        } else {
            add_or_update_user(username, newPassword, done, user_object)
        }
    })
}

function deleteuser(username:string, done) : void {
    get_user(username, (err, user_object) => {
        if (err) {
            done(err);
        } else {
            basic_method_on_user('DELETE', username + "?rev=" + user_object._rev, err => {
                if (err) {
                    done(err);
                } else {
                    delete_database_for_user(username, done);
                }
            });
        }
    });
}

function generic_db_request(request_method: string, path: string, request_body: object, responseCallback) : void {

    var base64encodedAuth = new Buffer(db_username + ':' + db_password).toString('base64');

    var request_options : http.RequestOptions;
    request_options = {
        host: db_host,
        port: db_port,
        path: path,
        method: request_method,
        headers: {
            'Authorization': 'Basic ' + base64encodedAuth,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

      // Set up the request
    var req = http.request(request_options, function(res) {
        var body = ''
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var response : dbwrapper.Iresponse = JSON.parse(body);
            responseCallback(response);
        })  
    });
    if (request_body) {
        req.write(JSON.stringify(request_body));
    }
    req.end();
}

let add_or_update_user : dbwrapper.add_or_update_user = (username, password, done, existing_user) => {

    // An object of options to indicate where to post to
    let post_data : dbwrapper.Iuser_post_data = {
        name: username,
        password: password,
        roles: [],
        type: 'user'
    };
    if (existing_user) {
        post_data._rev = existing_user._rev;
    }
    
    generic_db_request('PUT', '/_users/org.couchdb.user:' + username, post_data, data => {
        if (data.ok) {
            done();
        } else {
            done(data);
        }
    })
}

function get_user(username, done) : void {
    basic_method_on_user('GET', username, done);
}

function basic_method_on_user(method_name: string, username:string, done) : void {
// An object of options to indicate where to post to
    generic_db_request(method_name, '/_users/org.couchdb.user:' + username, null, data => {
        if (data.error) {
            done(new Error(JSON.stringify(data)));
        } else {
            done(null, data);
        }
    });
}

function create_database_for_user(username:string, done) : void {
    // Request to create database with the user having member access
    // The user (app) will then be able to query the API directly to access the database, with permission for this database only
    // PUT /dbname {id: "id", name: "name"} creates the database
    // PUT /dbname/_security {admins: {names: [], roles: []}, {members: {names: ["username"], roles: []}} adds the user
    let dbname: string = dbname_for_user(username);
    let create_params = {
        id: dbname,
        name: dbname
    }
    let security_params = {
        admins: {
            names: [],
            roles: []
        },
        members: {
            names: [username],
            roles: []
        }
    }
    generic_db_request('PUT', '/' + dbname, create_params, data => {
        if (data.error) {
            done(data);
        } else {
            generic_db_request('PUT', '/' + dbname + '/_security', security_params, data => {
                if (data.error) {
                    done(new Error(JSON.stringify(data)));
                } else {
                    done(null, data);
                }
            })
        }
    });
}
function delete_database_for_user(username: string, done) : void {
    generic_db_request('DELETE', '/' + dbname_for_user(username), null, data => {
        if (data.error) {
            done(new Error(JSON.stringify(data)));
        } else {
            done(null, data);
        }
    })
}

function dbname_for_user(username: string) : string {
    return 'pairlearn_' + username;
}

export {adduser, updateuser, deleteuser};