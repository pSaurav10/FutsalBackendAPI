const mongoose = require('mongoose');

const Post = mongoose.model('Post',{
    body:{ type:String},
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
    type: model.Types.ObjectId,
    ref: 'users'
  }
})