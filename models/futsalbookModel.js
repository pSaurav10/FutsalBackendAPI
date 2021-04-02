var mongoose = require('mongoose');

const FutsalBook = mongoose.model('FutsalBook',{
 FutsalName: {type: String},
 Date: {type:Date},
 Time: {type:String},
 UserName: {type:String},
 UserId: {type:String}
})

module.exports = FutsalBook;