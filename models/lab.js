const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// lab schems

const LabSchema = mongoose.Schema({
    labname:{
        type:String,
        unique: true
    },
    labdescription:{
        type: String
    },
    labimageurl:{
        type:String

    },
    isdeleted:{
        type:Boolean
    }
});

const Lab = module.exports = mongoose.model('Lab', LabSchema);

module.exports.getLabById = function(id,callback){
    Lab.findById(id, callback);
}

// find lab using lab name
module.exports.getLabbyName = function(labname, callback){
    const query = {labname:labname}
    Lab.findOne(query,callback);

}

module.exports.addLab = function(newLab,callback){
    newLab.save(newLab, function(err , newLab){
        if(err) throw err;
    });
}