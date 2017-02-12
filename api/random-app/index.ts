import express = require("express");
import bodyParser = require("body-parser");

import v1 from "./v1/index";

let app = express.Router();


app.use("/v1",v1);

app.use((req:express.Request , res:express.Response , next:Function)=>{
    
//    res.writeHead(404);
    res.json({
        from    : "random app",
        res     : "invalid version"
    });
});

export default app;


