var express = require("express");
var app = express.Router();
app.use(function (req, res, next) {
    //    res.writeHead(404);
    res.json({
        from: "random app",
        version: "v2",
        res: "request not found"
    });
});
module.exports = app;
