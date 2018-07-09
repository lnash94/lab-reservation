var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var multer = require('multer');
var ObjectId = require('mongodb').ObjectID;

var mongoose = require('mongoose');
const Lab = require('../models/lab'); 

const configurationOption ={
  methods: ['POST'],
  origin:'localhost:3300'
}



// var store =multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'../client/src/assets/images');
//     },
//     filename:function(req,file,cb){
//         cb(null, Date.now()+'.'+file.originalname);
//     }  
// });
// initialize multer
// var upload = multer({storage:store});


//register lab
// router.post('/register',upload.single('file'), function(req, res, next){
router.post('/register',function(req, res, next){

    let newLab = new Lab({
        labname: req.body.labname,
        labdescription: req.body.labdescription,
        // labimageurl: req.file.filename,
        isDeleted:false 
        
    });
   newLab.save(err => {  
    if (err) return res.status(500).send(err);
    return res.status(200).json({success: true, msg:'lab registered successfully'});
    });

});
//get single lab
router.get('/lab/:id',function(req,res,next){
    Lab.findOne({_id:req.params.id}, function(err, Lab){
        if(err){
          res.send(err);
      }
      res.json(Lab);
      });
    
}

);
//get all labs
router.get('/alllabs',function(req,res,next){
    Lab.find(function(err, labs){
        if(err){
            res.send(err);
        }
        res.json(labs);
    });
});

// update lab
router.put('/update/:id',function(req,res, next){
    
    Lab.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
        if (err){
            return next(err);
       
        } 
         return res.status(200).json({success: true, msg:'lab Updated successfully'});
    });
    


});
// Delete lab
router.delete('/delete/:id', function(req, res, next) {
    Lab.findByIdAndRemove(req.params.id, req.body, function (err, data) {
      if (err) return next(err);
      return res.status(200).json({success: true, msg:'lab Updated successfully'});
    });
  });



module.exports = router;

// update lab
// router.post('/update');
