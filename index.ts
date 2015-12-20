import express = require("express");
import teacher_student_app = require("./teacher-student-app/app");
let cors = require('cors');

let app = express();
let port = process.env.PORT || 8080;

app.use(cors());



app.use("/teacher-student-app",teacher_student_app);


app.get("/random/:min/:max", (req, res)=>{

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


app.listen(port,()=>{
    console.log('listening at: ' + port);
});
