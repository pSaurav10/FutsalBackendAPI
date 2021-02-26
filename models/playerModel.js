const mongoose = require('mongoose');

const Player = mongoose.model('Player',{
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    userType: {
        type: String,
        enum: ['Player', 'Owner', 'Admin']
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String,
        require: true
    },
    dob: {
        type: Date
    },
    imagepp:{
        type: String
    }
})

module.exports = Player