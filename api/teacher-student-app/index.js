"use strict";
var express = require("express");
var v1 = require("./v1");
var app = express.Router();
app.use("/v1", v1);
app.use(function (req, res, next) {
    res.json({
        from: "teacher student app",
        res: "invalid version"
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
