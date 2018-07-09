const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// reservation schems

const ReservationSchema = mongoose.Schema({
    reservelabid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab'
    },
    reservelabname:{
        type:String
    },
    reservedate:{
        type:Date
    },
    reason:{
        type:String
    },
    reserevetimestart:{
        type:String
    },
    reserevetimeend:{
        type:String
    },
    reservedby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isfullday:{
        type:Number
    },
    accepted:{
        type:String
    },
    isdeleted:{
        type:Boolean
    }
});

const Reservation = module.exports = mongoose.model('Reservation', ReservationSchema);

