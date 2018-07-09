var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

var mongoose = require('mongoose');
const User = require('../models/user'); 


const configurationOption ={
  methods: ['POST'],
  origin:'localhost:3300'
}


/* GET users listing. */
//register
router.post('/register', function(req, res, next) {
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    usertype: req.body.usertype,
    accepteduser: 0,
    userucscid: req.body.userucscid,
    userimageurl: req.body.userimageurl,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  User.addUser(newUser, (err, user)=>{
    if(err){
      console.log(err);
      res.json({success: false, msg:'failed to register user'});
    }
    else{
      let payload = {subject: user._id}
      let token = jwt.sign(payload, 'secretKey'); 
      res.json({success: true, msg:'user registered'}).send({token});
    }
  });
});

// Authenticats
router.post('/authenticate', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success:false, msg:'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch)=>{
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // one week
        });
        res.json({
          success:true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            usertype: user.usertype,
            userucscid:user.userucscid,
            userimageurl: user.userimageurl,
            username: user.username,
            email: user.email
          }
          
        });
      }else{
        return res.json ({success:false, msg: "wrong password"});
      }
    });
  });
});

//profile
router.get('/profile',  passport.authenticate('jwt',{session:false}), (req, res, next)=> {
  res.json({user: req.user});
});

//validate
router.get('/validate',function(req, res, next) {
  res.send('validate');
});

// get all users
router.get('/allusers',function(req,res,next){
  User.find(function(err, useres){
      if(err){
          res.send(err);
      }
      res.json(useres);
  });
});

//get accepted users 

module.exports = router;
