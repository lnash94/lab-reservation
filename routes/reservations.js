var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var mongoose = require('mongoose');
const Reservation = require('../models/reservation'); 

const configurationOption ={
  methods: ['POST'],
  origin:'localhost:3300'
}
// add reservation
router.post('/register',function(req,res,next){
  let newReservation = new Reservation({
    reservelabid:req.body.reservelabid,
    reservelabname:req.body.reservelabname,
    reservedate:req.body.reservedate,
    reason:req.body.reason,
    reserevetimestart:req.body.reserevetimestart,
    reserevetimeend:req.body.reserevetimeend,
    reservedby:req.body.reservedby,
    isfullday:req.body.isfullday,
    accepted:"new",
    isdeleted:false

  });

  console.log(newReservation);

  newReservation.save(err=>{
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).json({success: true, msg:'Your reservation is successfully recorded.'});
    
  });
});

// get all reservation according to date
router.get('/allreservationdate/:reservedate',function(req,res,next){
  Reservation.find({reservedate:req.params.reservedate}, function(err, Reservations){
    if(err){
      res.send(err);
  }
  res.json(Reservations);
  }).populate('reservedby',['usertype','firstname','lastname']);

});

// get all reservation according to lab and date
router.get('/allreservation/:reservelabname/:reservedate',function(req,res,next){
  Reservation.find({reservelabname:req.params.reservelabname,reservedate:req.params.reservedate}, function(err, Reservations){
    if(err){
      res.send(err);
  }
  res.json(Reservations);
  }).populate('reservedby',['usertype','firstname','lastname']);

});


// get all reservations join with user table to get user type and name 
router.get('/allreservations',function(req,res,next){
  Reservation.find(function(err,reservations){
      if(err){
          res.send(err);
      }
      res.json(reservations);
  }).populate('reservedby',['usertype','firstname','lastname']);
});


// getall reservation according to user id
router.get('/allreservations/:userid',function(req,res,next){
  Reservation.find({reservedby:req.params.userid}, function(err, Reservations){
    if(err){
      res.send(err);
  }
  res.json(Reservations);
  }).populate('reservedby',['usertype','firstname','lastname']);

});
// get all new reservation
router.get('/allnewreservations',function(req,res,next){
  Reservation.find({accepted:"new"},function(err,reservations){
      if(err){
          res.send(err);
      }
      res.json(reservations);
  }).populate('reservedby',['usertype','firstname','lastname']);
});

// accepted request
router.put('/update/:id',function(req,res, next){
    
  Reservation.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
      if (err){
          return next(err);
     
      } 
       return res.status(200).json({success: true, msg:'lab Updated successfully'});
  });
  


});


module.exports = router;
