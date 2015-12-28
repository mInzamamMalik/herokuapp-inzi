var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var usersModal = require("./modals/users");
mongoose.connect("mongodb://malikasinger:pakistan@ds037095.mongolab.com:37095/inzi");
var app = express.Router();
app.use(bodyParser.json({}));
app.post("/signup", function (req, res, next) {
    var signupInfo = req.body.signupInfo;
    var currentDocument = new usersModal({
        firstName: signupInfo.fname,
        lsatName: signupInfo.lname,
        username: signupInfo.username,
        password: signupInfo.password,
        email: signupInfo.email
    });
    currentDocument.save(next);
    res.json({ res: "default response" });
});
// app.post("signup/validation/email",(req:express.Request , res:express.Response , next:Function)=>{
//     let email = req.body.email;
//     usersModal.findone();
// });
var allUsers = []; // this line will be removed before host on heroku
app.post("/login", function (req, res) {
    var logedin = null;
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
    }
    else {
        res.json({
            status: "Email or Password not matched"
        });
    }
});
app.get("/login", function (req, res) {
    console.log("get login hitted");
    res.end();
});
app.use(function (req, res, next) {
    res.writeHead(404);
    res.json({
        from: "teacher student app",
        version: "v1",
        res: "request not found"
    });
});
app.use("/signup", function (err, req, res, next) {
    console.log("error occured during save");
    console.log(err);
});
module.exports = app;
