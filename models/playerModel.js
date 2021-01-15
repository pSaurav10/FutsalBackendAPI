const mongoose = require('mongoose');

const Player = mongoose.model('Player',{
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    age: {
        type: Number
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    dob: {
        type: Date
    }
})

module.exports = Player