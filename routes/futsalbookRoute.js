const express = require('express');
const router = express.Router();
const FutsalBook = require('../models/futsalbookModel');


router.post('/futsalbook',  function (req, res){
    const body = req.body;
    const data = new FutsalBook({body});
    data.save()
    .then(function (result){
        res.status(200).json({message: "Booking Completed"})
    })
    .catch(function (error){
        res.status(500).json({message: error})
    })
})