const mongoose = require('mongoose');
const users = require('../models/playerModel');

const Post = mongoose.model('Post',{
    post:{ type:String},
  username: { type:String},
  createdAt: { type:String},
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: String,
    ref: 'users'
  }
})

module.exports = Post;