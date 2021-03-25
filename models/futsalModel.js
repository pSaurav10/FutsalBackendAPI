const mongoose = require('mongoose');

const Futsal = mongoose.model('Futsal',{
    name:{
        type: String,
        require:true
    },
    address:{
        type: String,
        require:true
    },
    phoneNumber:{
        type: Number,
        require:true
    },
    description:{
        type: String
    },
    image:{
        type: String
    },
    review:[{
        type: String
    }],
    grounds:{
        type: Number
    },
    approve:{
        type: Boolean
    }
})

module.exports = Futsal