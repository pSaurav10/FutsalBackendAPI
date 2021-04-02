var mongoose = require('mongoose');

const booking = mongoose.model('Booking',{
  name: {type:String},
  phone: {type: Number},
  email: {type: String}
})

module.exports = booking;