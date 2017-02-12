import express = require("express");


import v1 from "./v1/index";

var api = express.Router();




api.use("/v1",v1);


export default api;