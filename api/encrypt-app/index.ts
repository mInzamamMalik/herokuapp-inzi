import express = require("express");


let v1 = require("./v1/index");

var api = express.Router();




api.use("/v1",v1);


module.exports = api;