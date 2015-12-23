var express = require("express");
var bodyparser = require("body-parser");
var bcrypt = require("bcrypt-nodejs");
var api = express.Router();
api.use(bodyparser.json({}));
api.post("/passwordToHash", function (req, res, next) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash("paistan", salt, function () { }, function (err, hashedPassword) {
            if (err) {
                return next(err);
            }
            console.log(hashedPassword);
        });
    });
});
api.use(function (err, req, res, next) {
    console.log(err);
});
module.exports = api;
