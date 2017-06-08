const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASS;
import * as http from "http";

let add_user : dbwrapper.add_user = (username, password, done, existing_user) => {

    // An object of options to indicate where to post to
    var post_data : dbwrapper.Iuser_post_data;
    post_data.name = username;
    post_data.password = password;
    post_data.roles = [];
    post_data.type = 'user';
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
// An object of options to indicate where to post to
    var base64encodedData = new Buffer(db_username + ':' + db_password).toString('base64');

    var get_options = {
        host: db_host,
        port: db_port,
        path: '/_users/org.couchdb.user:' + username,
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + base64encodedData,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

      // Set up the request
    var post_req = http.get(get_options, function(res) {
        var body = ''
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var response : dbwrapper.Iresponse = JSON.parse(body);
            if (response.error) {
                done(null, response);
            } else {
                done(response);
            }
        })  
    });
}

function adduser(username:string, password:string, done) {
    get_user(username, (user_object, err) => {
        if (err) {
            add_user(username, password, done, null);
        } else {
            add_user(username, password, done, user_object)
        }
    })
}

export {adduser};