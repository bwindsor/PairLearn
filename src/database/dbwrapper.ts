const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASS;
import * as http from "http";

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
    var base64encodedData = new Buffer(db_username + ':' + db_password).toString('base64');

    var post_options : http.RequestOptions;
    post_options = {
        host: db_host,
        port: db_port,
        path: '/_users/org.couchdb.user:' + username,
        method: 'PUT',
        headers: {
            'Authorization': 'Basic ' + base64encodedData,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

      // Set up the request
    var post_req = http.request(post_options, function(res) {
        var body = ''
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var response : dbwrapper.Iresponse = JSON.parse(body);
            if (response.ok) {
                done();
            } else {
                done(response);
            }
        })  
    });
    post_req.write(JSON.stringify(post_data));
    post_req.end();
}

function get_user(username, done) {
    basic_method_on_user('GET', username, done);
}

function adduser(username:string, password:string, done) {
    add_or_update_user(username, password, done, null);
}

function updateuser(username: string, newPassword:string, done) {
    get_user(username, (err, user_object) => {
        if (err) {
            done(err);
        } else {
            add_or_update_user(username, newPassword, done, user_object)
        }
    })
}

function deleteuser(username:string, done) {
    get_user(username, (err, user_object) => {
        if (err) {
            done(err);
        } else {
            basic_method_on_user('DELETE', username + "?rev=" + user_object._rev, done);
        }
    });
}

function basic_method_on_user(method_name: string, username:string, done) {
// An object of options to indicate where to post to
    var base64encodedData = new Buffer(db_username + ':' + db_password).toString('base64');

    var get_options = {
        host: db_host,
        port: db_port,
        path: '/_users/org.couchdb.user:' + username,
        method: method_name,
        headers: {
            'Authorization': 'Basic ' + base64encodedData,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    // Set up the request
    var post_req = http.request(get_options, function(res) {
        var body = ''
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var response : dbwrapper.Iresponse = JSON.parse(body);
            if (response.error) {
                done(response);
            } else {
                done(null, response);
            }
        })  
    });
    post_req.end();
}

export {adduser, updateuser, deleteuser};