var express = require("express");
var index_1 = require("./v1/index");
var app = express.Router();
app.use("/v1", index_1.default);
app.use(function (req, res, next) {
    //    res.writeHead(404);
    res.json({
        from: "random app",
        res: "invalid version"
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
