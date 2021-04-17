const express = require('express');
const router = express.Router();
const FutsalBook = require('../models/futsalbookModel');
const playerAuth = require('../middleware/playerAuth');

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
        res.status(200).json({success: true, message: "Booking Completed"})
    })
    .catch(function (error){
        res.status(500).json({message: error})
    })
})


router.get('/futsalbookget', playerAuth.verifyUser, function (req, res){
    const id = req.user._id
    FutsalBook.find({ userid: id })
        .then(function (bookdata) {
            res.status(200).json({ success: true, data: bookdata });
        })
        .catch(function (error) {
            res.status(500).json({ message: error })
            console.log(error)
        })
})

router.delete('/futsalbook/delete/:id', function (req, res) {
    const id = req.params.id
    FutsalBook.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ success: true, message: "Futsal Booking deleted" })
        })
        .catch(function (err) {
            res.status(500).json({ success: true, message: "Cannot delete Futsal Booking" })
        })
})

module.exports = router;