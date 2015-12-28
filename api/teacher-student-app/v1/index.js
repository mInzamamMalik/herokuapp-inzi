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
});
// app.post("signup/validation/email", (req: express.Request, res: express.Response, next: Function) => {
//     let email = req.body.email;
//     console.log(email);
//     usersModal.findOne({ 'email': email }, 'email search', function(err, data) {
//         if (data)
//             res.send(data);
//         if (err) res.send(err);
//     });
// });
app.post("/login", function (req, res, next) {
    var loginInfo = req.body.loginInfo;
    console.log(loginInfo);
    usersModal.find({ 'username': loginInfo.username }, 'password', function (err, data) {
        if (data) {
            console.log("no error ", data);
            if (data.length == 0) {
                console.log("loged in successfully");
                res.send({
                    status: "error",
                    message: "user not found",
                    logedIn: false
                });
                return;
            }
            else {
                if (loginInfo.password == data[0].password) {
                    console.log("loged in successfully");
                    res.send({
                        status: "success",
                        message: "loged in as " + loginInfo.username,
                        logedIn: true
                    });
                    return;
                }
                else {
                    console.log("password not matched");
                    res.send({
                        status: "error",
                        message: "password not matched",
                        logedIn: false
                    });
                    return;
                }
            }
        }
        else if (err) {
            console.log("error found");
            next(err);
            return;
        }
    });
});
// app.use((req: express.Request, res: express.Response, next: Function) => {
//     res.json({
//         from: "teacher student app",
//         version: "v1",
//         res: "request not found"
//     });
// });
// app.use("/signup", (err: Error, req: express.Request, res: express.Response, next: Function) => {
//     console.log("error occured during save");
//     console.log(err);
//     res.send(err);
// });
module.exports = app;
//# sourceMappingURL=index.js.map