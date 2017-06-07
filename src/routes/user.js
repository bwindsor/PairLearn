const express = require("express");
const router = express.Router();
const dbwrapper = require("../database/dbwrapper.js");
/*
router.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    res.send("Hello World!\n");
});
*/
// Create or update a user
router.put('/:username', (req, res, next) => {
    var username = req.params.username;
    var password = req.body.password;
    if (username && password) {
        dbwrapper.adduser(username, password, err => {
            if (err) {
                next(err);
            } else {
                res.status(200).json(null);
            }
        });
    } else {
        next({"error": true, "reason": "Must supply a username and password"})
    }

});


exports.default = router;