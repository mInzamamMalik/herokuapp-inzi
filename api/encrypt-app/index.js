var express = require("express");
var index_1 = require("./v1/index");
var api = express.Router();
api.use("/v1", index_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = api;
