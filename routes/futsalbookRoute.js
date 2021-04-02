const express = require('express');
const router = express.Router();
const FutsalBook = require('../models/futsalbookModel');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/futsalbook', function (req, res){
    const futsalname = req.body.futsalname
    const futsalid = req.body.futsalid
    const date = req.body.date
    const time = req.body.time
    const username = req.body.username
    const userid = req.body.userid
    const data = new FutsalBook({futsalname: futsalname, futsalid: futsalid, date: date,
    time: time, username: username, userid: userid});
    data.save()
    .then(function (result){
        res.status(200).json({message: "Booking Completed"})
    })
    .catch(function (error){
        res.status(500).json({message: error})
    })
})

module.exports = router;