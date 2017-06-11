import * as express from "express";
const router = express.Router();
import * as dbwrapper from "../database/dbwrapper"
/*
router.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    res.send("Hello World!\n");
});
*/
// Create a user (no permissions required)
// A user can update themselves directly once authenticated directly with CouchDB
router.post('/:username', (req, res, next) => {
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
// Delete a user - a user can also do this directly, but we need to delete the database too,
// so we pass the request on to CouchDB. If successful, we also delete the user's database
// which requires admin rights.
router.delete('/:username', (req, res, next) => {
    let username : string = req.params.username;
    dbwrapper.deleteuser(username, err => {
        if (err) {
            next(err)
        } else {
            res.status(200).json(null);
        }
    })
})

export default router;