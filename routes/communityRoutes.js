const express = require('express');
const router = express.Router();
const Post = require('../models/communityModel');
const { check, validationResult } = require('express-validator');


//Community Post Add
router.post('/post/add', [
    check('post', 'You cannot add empty post').not().isEmpty()
], function(req,res){
    if (errors.isEmpty()){
        const post = req.body.post;
        const username = req.body.username;
        const createdAt = new Date().toISOString();
        const comments = req.body.comments;
        const likes = req.body.likes;
        const data = new Post({post: post, username: username,
        createdAt: createdAt, comments: comments, likes: likes })
        data.save().then(function(result){
            res.status(200).json({message: "Post added Successfully"})   
        }).catch(function(error){
            res.status(500).json({
                message: error
            })
        })
    }else{
        res.status(500).json(errors.array())    
    }
});

//Community Post Delete
router.delete('/post/delete/:id', function (req, res) {
    const id = req.params.id
    Post.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ message: "Post deleted" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Cannot delete Post" })
        })
});

//Community post update
router.put('/post/update', function (req, res) {
    const post = req.body.post;
    const username = req.body.username;
    const createdAt = new Date().toISOString();
    const comments = req.body.comments;
    const likes = req.body.likes;
    const id = req.body.id;
    Post.updateOne({_id: id},{post: post, username: username,
        createdAt: createdAt, comments: comments, likes: likes })
        .then(function (result) {
            res.status(200).json({ message: "Futsal Updated" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Update failure" })
        })
});
