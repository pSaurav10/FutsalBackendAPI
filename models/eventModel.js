const mongoose = require('mongoose');

const Event = mongoose.model('Event',{
    name: {type:String},
    description:{type:String},
    image:{type:String},
    date:{type:Date},
    location:{type:String}
});

module.exports = Event;