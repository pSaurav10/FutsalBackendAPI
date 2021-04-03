const mongoose = require('mongoose');

const Post = mongoose.model('Post',{
  post:{ type:String},
  username: { type:String},
  userimage:{type:String},
  createdAt: { type:String},
  userid:{type:String},
  comments: [
    {
      body: {type:String},
      username: {type:String},
      userimage: {type:String},
      createdAt: {type:String},
      userid:{type:String}
    }
  ]
})

module.exports = Post;