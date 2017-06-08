"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const dbwrapper = require("../database/dbwrapper");
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
            }
            else {
                res.status(200).json(null);
            }
        });
    }
    else {
        next({ "error": true, "reason": "Must supply a username and password" });
    }
});
// Delete a user
router.delete('/:username', (req, res, next) => {
    let username = req.params.username;
    dbwrapper.deleteuser(username, err => {
        if (err) {
            next(err);
        }
        else {
            res.status(200).json(null);
        }
    });
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEMsbURBQWtEO0FBQ2xEOzs7Ozs7RUFNRTtBQUNGLDBCQUEwQjtBQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUNwQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNqQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2QixTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRztZQUNyQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxxQ0FBcUMsRUFBQyxDQUFDLENBQUE7SUFDMUUsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQWdCO0FBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQ3ZDLElBQUksUUFBUSxHQUFZLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzVDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUc7UUFDOUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNiLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5pbXBvcnQgKiBhcyBkYndyYXBwZXIgZnJvbSBcIi4uL2RhdGFiYXNlL2Rid3JhcHBlclwiXHJcbi8qXHJcbnJvdXRlci5nZXQoJy8nLCAocmVxLCByZXMpID0+IHtcclxuICAgIHJlcy5zdGF0dXMoMjAwKTtcclxuICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3BsYWluJyk7XHJcbiAgICByZXMuc2VuZChcIkhlbGxvIFdvcmxkIVxcblwiKTtcclxufSk7XHJcbiovXHJcbi8vIENyZWF0ZSBvciB1cGRhdGUgYSB1c2VyXHJcbnJvdXRlci5wdXQoJy86dXNlcm5hbWUnLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIHZhciB1c2VybmFtZSA9IHJlcS5wYXJhbXMudXNlcm5hbWU7XHJcbiAgICB2YXIgcGFzc3dvcmQgPSByZXEuYm9keS5wYXNzd29yZDtcclxuICAgIGlmICh1c2VybmFtZSAmJiBwYXNzd29yZCkge1xyXG4gICAgICAgIGRid3JhcHBlci5hZGR1c2VyKHVzZXJuYW1lLCBwYXNzd29yZCwgZXJyID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24obnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV4dCh7XCJlcnJvclwiOiB0cnVlLCBcInJlYXNvblwiOiBcIk11c3Qgc3VwcGx5IGEgdXNlcm5hbWUgYW5kIHBhc3N3b3JkXCJ9KVxyXG4gICAgfVxyXG5cclxufSk7XHJcbi8vIERlbGV0ZSBhIHVzZXJcclxucm91dGVyLmRlbGV0ZSgnLzp1c2VybmFtZScsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgbGV0IHVzZXJuYW1lIDogc3RyaW5nID0gcmVxLnBhcmFtcy51c2VybmFtZTtcclxuICAgIGRid3JhcHBlci5kZWxldGV1c2VyKHVzZXJuYW1lLCBlcnIgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24obnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiXX0=