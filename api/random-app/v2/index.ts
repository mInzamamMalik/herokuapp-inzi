import express = require("express");
import bodyParser = require("body-parser");


let app = express.Router();





app.use((req:express.Request , res:express.Response , next:Function)=>{
    
    res.writeHead(404);
    res.json({
        from    : "random app",
        version : "v2",
        res     : "request not found"
    });
});
module.exports = app;