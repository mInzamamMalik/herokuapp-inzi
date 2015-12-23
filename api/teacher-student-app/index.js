var express = require("express");
var v1 = require("./v1");
var app = express.Router();
app.use("/v1", v1);
app.use(function (req, res, next) {
    res.writeHead(404);
    res.json({
        from: "teacher student app",
        res: "invalid version"
    });
});
5;
module.exports = app;
