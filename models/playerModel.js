const mongoose = require('mongoose');

const Player = mongoose.model('Player',{
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date
    },
    imagepp:{
        type: String
    }
})

module.exports = Player