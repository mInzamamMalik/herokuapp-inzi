"use strict";
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
api.post("/varifyHash", function (req, res, next) {
    var realPassword = req.body.realPassword;
    var hashedPassword = req.body.hashedPassword;
    bcrypt.compare(realPassword, hashedPassword, function (err, result) {
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
module.exports = api;
