var express = require("express");
var bodyparser = require("body-parser");
var bCrypt_1 = require("bcrypt-nodejs/bCrypt");
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
    bCrypt_1.default.genSalt(rounds, function (err, salt) {
        if (err) {
            return next(err);
        }
        bCrypt_1.default.hash(password, salt, function () { }, function (err, hashedPassword) {
            if (err) {
                return next(err);
            }
            res.json({ res: hashedPassword });
        });
    });
});
api.post("/varifyHash", function (req, res, next) {
    var realPassword = req.body.realPassword;
    var hashedPassword = req.body.hashedPassword;
    bCrypt_1.default.compare(realPassword, hashedPassword, function (err, result) {
        console.log(result, err);
        if (err) {
            return next('Encrypted password is invalid');
        }
        if (result == false) {
            return next('NOT Matched');
        }
        res.json({
            res: 'Password and Hash Matched'
        });
    });
});
api.use("/varifyHash", function (err, req, res, next) {
    res.json({
        res: err
    });
});
api.use(function (err, req, res, next) {
    console.log(err);
    res.json({
        err: err
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = api;
