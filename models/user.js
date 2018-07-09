const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schems

const UserprofileSchema = mongoose.Schema({
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    usertype:{
        type:String
    },
    accepteduser:{
        type: Number,
        default:0
    },
    userucscid:{
        type: Number
    },
    userimageurl:{
        type: String,
        default: "..\public\images\defult.jpg"
    },
    username: {
        type: String,
        unique: true,
        required: true
      },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastlogin: { 
        type: Date,
        default: Date.now 
    }

});

// const UseridentitySchema = mongoose.Schema({
//     ,
//     userid:{
//         type: mongoose.Schema.Types.ObjectId, ref: 'UserprofileSchema'
//     }
// });

const User = module.exports = mongoose.model('User',UserprofileSchema);
// const Useridentity = module.exports = mongoose.model('User',UseridentitySchema);

module.exports.getUserById = function(id,callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername =function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err , salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err)throw err;
        callback(null, isMatch);
    });
}