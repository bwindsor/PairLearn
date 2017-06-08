require('dotenv').config({ path: './process.env' });
var assert = require("assert");
var dbwrapper = require("../lib/database/dbwrapper");
var child_process = require("child_process");

before((done) => {
    child_process.exec("npm start");
    setTimeout(done, 1500);
})
after(() => {
    child_process.execSync("npm stop");
})

describe("dbwrapper", () => {
    describe("add_user", () => {
        it("adds a user", (done) => {
            dbwrapper.adduser("user123", "password123", err => {
                if (err) done(new Error(JSON.stringify(err)));
                else done();
            })
        });
        it ("deletes a user", (done) => {
            dbwrapper.deleteuser("user123", err => {
                if (err) done(new Error(JSON.stringify(err)));
                else done();
            })
        })
    })
})