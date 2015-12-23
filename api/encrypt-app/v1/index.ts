import express = require("express");
import bodyparser = require("body-parser");
let bcrypt = require("bcrypt-nodejs");

let api = express.Router();

api.use( bodyparser.json({}) );


api.post("/passwordToHash",(req:express.Request , res:express.Response , next:Function)=>{
    
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            return next(err);
        }
        
        bcrypt.hash("paistan", salt, ()=>{}, (err,hashedPassword)=>{
            if(err){
                return next(err);
            }   
            
            console.log(hashedPassword);
            
            
        });
        
    });
    
});



api.use((err , req:express.Request , res:express.Response , next:Function)=>{
    console.log(err);
});


module.exports = api;

