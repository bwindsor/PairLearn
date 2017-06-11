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
    let user_list = [
        {
            name: "user123",
            pass: "pass123"
        },
        {
            name: "user234",
            pass: "pass234"
        },
        {
            name: "user456",
            pass: "pass456"
        }
    ];
    // Clean up user list after each test
    afterEach((done) => {
        for (let i = 0; i < user_list.length; i++) {
            dbwrapper.deleteuser(user_list[i].name, err => {});
        }
        // TODO - the for loop should be done using a waterfall or something
        // instead of waiting a second at the end and assuming the loop is
        // complete.
        setTimeout(done, 1000);
    });
    describe("add_user", () => {
        it("adds a user", (done) => {
            dbwrapper.adduser(user_list[0].name, user_list[0].pass, err => {
                if (err) done(new Error(JSON.stringify(err)));
                else done();
            })
        });
        it("fails to add an already existing user", (done) => {
            dbwrapper.adduser(user_list[1].name, user_list[1].pass, err => {
                if (err) {
                    done(new Error(JSON.stringify(err)));
                } else {
                    dbwrapper.adduser(user_list[1].name, user_list[1].pass, err => {
                        if (err) done();
                        else done(new Error("An error was expected but was not thrown"));
                    })
                }
            })
        })
    });
    describe("deleteuser", () => {
        it ("deletes a user", (done) => {
            // This assumes adduser has passed.
            dbwrapper.adduser(user_list[0].name, user_list[0].pass, err => {
                if (err) {
                    done(err);
                } else {
                    dbwrapper.deleteuser(user_list[0].name, err => {
                        if (err) done(new Error(JSON.stringify(err)));
                        else done();
                    })
                }
            })
        })
        it ("fails to delete a non-existent user", (done) => {
            dbwrapper.deleteuser(user_list[2].name, err => {
                if (err) done();
                else done(new Error("An error was expected but not thrown"));
            })
        })
    });
    describe("updateuser", () => {
        it("changes a password", (done) => {
            dbwrapper.adduser(user_list[0].name, user_list[0].pass, err => {
                if (err) {
                    done(err);
                } else {
                    dbwrapper.updateuser(user_list[0].name, user_list[0].pass + "X", err => {
                        if (err) done(err);
                        else done();
                    })
                }
            })
        })
    })
})