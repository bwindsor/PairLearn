"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQ7Ozs7OztFQU1FO0FBQ0YsMEJBQTBCO0FBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQ3BDLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ25DLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLHFDQUFxQyxFQUFDLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbmNvbnN0IGRid3JhcHBlciA9IHJlcXVpcmUoXCIuLi9kYXRhYmFzZS9kYndyYXBwZXIuanNcIik7XHJcbi8qXHJcbnJvdXRlci5nZXQoJy8nLCAocmVxLCByZXMpID0+IHtcclxuICAgIHJlcy5zdGF0dXMoMjAwKTtcclxuICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3BsYWluJyk7XHJcbiAgICByZXMuc2VuZChcIkhlbGxvIFdvcmxkIVxcblwiKTtcclxufSk7XHJcbiovXHJcbi8vIENyZWF0ZSBvciB1cGRhdGUgYSB1c2VyXHJcbnJvdXRlci5wdXQoJy86dXNlcm5hbWUnLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIHZhciB1c2VybmFtZSA9IHJlcS5wYXJhbXMudXNlcm5hbWU7XHJcbiAgICB2YXIgcGFzc3dvcmQgPSByZXEuYm9keS5wYXNzd29yZDtcclxuICAgIGlmICh1c2VybmFtZSAmJiBwYXNzd29yZCkge1xyXG4gICAgICAgIGRid3JhcHBlci5hZGR1c2VyKHVzZXJuYW1lLCBwYXNzd29yZCwgZXJyID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24obnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV4dCh7XCJlcnJvclwiOiB0cnVlLCBcInJlYXNvblwiOiBcIk11c3Qgc3VwcGx5IGEgdXNlcm5hbWUgYW5kIHBhc3N3b3JkXCJ9KVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19