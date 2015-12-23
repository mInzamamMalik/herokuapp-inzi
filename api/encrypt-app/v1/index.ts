import express = require("express");
import bodyparser = require("body-parser");
let bcrypt = require("bcrypt-nodejs");

let api = express.Router();

api.use(bodyparser.json({}));


api.post("/passwordToHash", (req: express.Request, res: express.Response, next: Function) => {
    let rounds = req.body.rounds;
    let password = req.body.password;
    
    if(!password){
        return next("password(which you want to encrypt) is required");
    }

    bcrypt.genSalt(rounds, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(password, salt, () => { }, (err, hashedPassword) => {
            if (err) {
                return next(err);
            }

            res.json({ res: hashedPassword });
        });
    });
});



api.use((err, req: express.Request, res: express.Response, next: Function) => {
    res.json({
        err: err
    });
});


module.exports = api;

