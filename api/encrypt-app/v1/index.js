var express = require("express");
var bodyparser = require("body-parser");
var bcrypt = require("bcrypt-nodejs");
var api = express.Router();
api.use(bodyparser.json({}));
api.post("/passwordToHash", function (req, res, next) {
    var rounds = req.body.rounds;
    var data = req.body.password;
    bcrypt.genSalt(rounds, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(data, salt, function () { }, function (err, hashedPassword) {
            if (err) {
                return next(err);
            }
            res.json({ res: hashedPassword });
        });
    });
});
api.use(function (err, req, res, next) {
    res.json({
        err: err
    });
});
module.exports = api;
