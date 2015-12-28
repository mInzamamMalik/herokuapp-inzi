import express = require("express");


var v1 = require("./v1");

var app = express.Router();


app.use("/v1",v1);


app.use((req:express.Request , res:express.Response , next:Function)=>{
    
    res.json({
        from    : "teacher student app",
        res     : "invalid version"
    });
});


module.exports = app;
