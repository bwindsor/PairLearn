"use strict";

const express = require("express");
const user = require("../routes/user.js");
const index = require("../routes/index.js");
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use('/', index.default); // index
app.use('/user', user.default); // user

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.setHeader('Content-Type', 'text/json');
        res.send({
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.setHeader('Content-Type', 'text/json');
    res.send({
        message: err.message,
        error: {}
    });
});

exports.default = app;