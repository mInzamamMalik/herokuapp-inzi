var express = require("express");
var cors = require('cors');
//var teacher_student_app = require("./api/teacher-student-app/index");
var random_app = require("./api/random-app/index");
var teacher_student_app = require("./api/teacher-student-app/index");
var encrypt_app = require("./api/encrypt-app/index");
var app = express();
var port = process.env.PORT || 3000;
app.use(cors());
app.use("/random", random_app);
app.use("/teacher-student-app", teacher_student_app);
app.use("/encrypt-app", encrypt_app);
app.listen(port, function () {
    console.log('listening at: ' + port);
});
