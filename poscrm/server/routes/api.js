const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const User = require("../models/user.model");
const Applicationusers = require("../models/applicationusers.model");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const connection = (closure) => {
    return MongoClient.connect(config.dbconnstring, (err, client) => {
    if (err) return console.log(err);
    
    let db = client.db(config.dbname);
    closure(db);
    });
    };

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.get("/",(req,res)=>{
    res.json({message:"Welcome to the Workd Class Node API"});
});
router.post("/authenticate",(req,res)=>{
    User.findOne({name:req.body.name},(err,user)=>{
        if(err) throw err;
        console.log(req.body.name,req.body.password);
        if(!user){
            res.json("Authendication failed: User not found");
        }
        else if(user){
                if(user.password != req.body.password){
                    res.json("Password not matched");
                }
                else{
                    const payLoad = {
                        admin:user.admin
                    }
                    var token = jwt.sign(payLoad,config.secret,{expiresIn:40});
                    res.json({
                        success:true,
                        message:'Enjoy your tokern',
                        token:token,
                    })
                }
        }
    })
});
router.post("/login",(req,res)=>{
    Applicationusers.findOne({name:req.body.name,password:req.body.password},(err,user)=>{
        if(err) throw err;
        if(!user){
            res.json({status:false,message:"login failure"});
        }
        else if(user){
            res.json({status:true,message:"Login success"});
        }
    });
});
router.get("/setup",(req,res)=>{
    var nick = new User({
        name:'senthilkumar',
        password:'India$123',
        admin:true,
    })
    nick.save(function(err){
        if(err) throw err;
        console.log("User created successfully");
        res.json({success:true});

    })

});

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
module.exports = router;