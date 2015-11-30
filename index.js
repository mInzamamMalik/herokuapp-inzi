/**
 * Created by malikasinger on 12/1/2015.
 */


var express = require("express");
var cors = require('cors');

var app = express();


app.use(cors());


app.get("/random/:min/:max", function (req, res) {

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


app.listen(3000, function () {
    console.log('listening at 3000');
});
