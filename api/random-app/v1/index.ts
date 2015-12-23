import express = require("express");
import bodyParser = require("body-parser");


let app = express.Router();

app.get("/:min/:max", (req, res)=>{

    console.log(req.params);
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);


    if (isNaN(min) || isNaN(max)) {

        res.json({error: "error: bad command"});
        return;
    }

    var result = Math.round((Math.random() * (max - min)) + min);
    res.json({result: result});
});



app.use((req:express.Request , res:express.Response , next:Function)=>{
    
 //   res.writeHead(404);
    res.json({
        from    : "random app",
        version : "v1",
        res     : "request not found"
    });
});

module.exports = app;