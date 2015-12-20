var express = require("express");
var teacher_student_app = require("./teacher-student-app/app");
var cors = require('cors');
var app = express();
var port = process.env.PORT || 8080;
app.use(cors());
app.use("/teacher-student-app", teacher_student_app);
app.get("/random/:min/:max", function (req, res) {
    console.log(req.params);
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);
    if (isNaN(min) || isNaN(max)) {
        res.json({ error: "error: bad command" });
        return;
    }
    var result = Math.round((Math.random() * (max - min)) + min);
    res.json({ result: result });
});
app.listen(port, function () {
    console.log('listening at: ' + port);
});
