var express = require("express");
var bodyparser = require("body-parser");
var bcrypt = require("bcrypt-nodejs");
var api = express.Router();
api.use(bodyparser.json({}));
api.post("/passwordToHash", function (req, res, next) {
    var rounds = parseInt(req.body.rounds);
    var password = req.body.dataToBeEncrypted;
    if (!password) {
        return next("password(which you want to encrypt) is required");
    }
    if (isNaN(rounds) || !rounds) {
        rounds = 10;
        console.log("invalid rounds");
    }
    bcrypt.genSalt(rounds, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(password, salt, function () { }, function (err, hashedPassword) {
            if (err) {
                return next(err);
            }
            res.json({ res: hashedPassword });
        });
    });
});
api.use(function (err, req, res, next) {
    console.log(err);
    res.json({
        err: err
    });
});
module.exports = api;
