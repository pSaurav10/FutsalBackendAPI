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
    image:{
        type: String,
    },
    approve:{
        type: Boolean
    }
})

module.exports = Futsal