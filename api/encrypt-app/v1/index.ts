import * as express from "express";
import * as bodyparser from "body-parser";
import bcrypt  from "bcrypt-nodejs/bCrypt";

let api = express.Router();

api.use(bodyparser.json({}));


api.post("/passwordToHash", (req: express.Request, res: express.Response, next: Function) => {
    let rounds = parseInt(req.body.rounds);
    var password = req.body.dataToBeEncrypted;

    if (!password) {
        return next("password(which you want to encrypt) is required");
    }
    if (isNaN(rounds) || !rounds) {
        rounds = 10;
        console.log("invalid rounds");
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


api.post("/varifyHash", (req: express.Request, res: express.Response, next: Function) => {
    let realPassword    = req.body.realPassword; 
    let hashedPassword  = req.body.hashedPassword;
        
    bcrypt.compare(realPassword,hashedPassword,(err,result)=>{ 
        console.log(result , err);
               
        if(err){               
            return next('Encrypted password is invalid');
        }        
        if(result == false){           
            return next('NOT Matched');
        }
        res.json({
            res: 'Password and Hash Matched'   
        });
    });          
});



api.use("/varifyHash",(err, req:express.Request , res:express.Response , next:Function)=>{
    res.json({
        res: err
    });
});


api.use((err, req: express.Request, res: express.Response, next: Function) => {

    console.log(err);
    res.json({
        err: err
    });
});


export default api;

