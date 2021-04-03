const express = require('express');
const router = express.Router();
const FutsalBook = require('../models/futsalbookModel');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/futsalbook', function (req, res){
    const body = req.body;
    console.log(body)
    console.log(req.body.userid)
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


router.post('/futsalbookget/:id', function (req, res){
    const id = req.params.id
    FutsalBook.findOne({ _id: id })
        .then(function (bookdata) {
            res.status(200).json({ success: true, data: bookdata });
        })
        .catch(function (error) {
            res.status(500).json({ message: error })
            console.log(error)
        })
})

module.exports = router;