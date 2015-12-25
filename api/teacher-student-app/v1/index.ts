import express = require("express");
import bodyParser = require("body-parser");


var allUsers = [
    {
        email: "malikasinger@gmail.com",
        password: "pakistan",
        adminStatus: 'admin'
    },
    {
        email: "admin@admin.com",
        password: "admin",
        adminStatus: 'admin'
    },
    {
        email: "user@user.com",
        password: "user",
        adminStatus: 'user'
    }
];
var app = express.Router();



app.use(bodyParser.json({}));





app.post("/signup",(req:express.Request , res:express.Response )=>{
    var signupInfo = req.body;

    
    res.json({res : "default response"});
});























app.post("/login", function (req, res) {

    var logedin = null;
    console.log("post hitted " + logedin);

    for (var i = 0; i < allUsers.length; i++) {

        if (req.body.email == allUsers[i].email) {
            if (req.body.password == allUsers[i].password) {
                logedin = i;
                console.log(allUsers[i].email + "   " + allUsers[i].password);
                break;
            }

        }
    }


    if (logedin != null) {
        res.json({
            status: "signed in",
            as: allUsers[logedin].email,
            adminStatus: allUsers[logedin].adminStatus
        });
    } else {
        res.json({
            status: "Email or Password not matched"
        })
    }
});

app.get("/login", function (req, res) {
    console.log("get login hitted");
    res.end();
});



app.use((req:express.Request , res:express.Response , next:Function)=>{
    
    res.writeHead(404);
    res.json({
        from    : "teacher student app",
        version : "v1",
        res     : "request not found"
    });
});


module.exports = app;
