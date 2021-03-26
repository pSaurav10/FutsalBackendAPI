const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const playerAuth = require('../middleware/playerAuth');
const { check, validationResult } = require('express-validator');
const upload = require('../middleware/imgUpload')

//Event Add
router.post('/event/add',playerAuth.verifyUser, upload.single('image'), function (req, res){
    if(req.file == undefined ){
        res.status(500).json({ message: "File type mismatch"})
    }
    const name = req.body.name;
    const description = req.body.description;
    const image = req.file.filename;
    const date = req.body.date;
    const fee = req.body.fee;
    const phone = req.body.phone;
    const location = req.body.location;
    const approve = req.body.approve;
    const data = new Event({
        name: name, description: description, image: image, date: date,
        fee: fee, phone: phone, location: location, approve: approve
    })
    data.save()
    .then(function (result) {
        // success
        res.status(200).json({ message: "Event registered successfully" })
    }).catch(function (error) {
        res.status(500).json({ message: error })
    })
});

//Event Delete
router.delete('/event/delete/:id', function (req, res) {
    const id = req.params.id
    Event.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ message: "Event deleted" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Cannot delete Event" })
        })
});

router.get('/event/fetch',function(req,res){
    Event.find().then(function(Eventdata){
    res.status(200).json({ data: Eventdata});
    })
})

router.get('/event/fetch/:id', function (req, res) {
    const id = req.params.id
    Event.findOne({_id:id})
    .then(function (eventdata) {
        res.status(200).json({ success: true, data: eventdata });
    })
})

// Event Update
router.put('/event/update', upload.single('image'), function (req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.file.path;
    const date = req.body.date;
    const location = req.body.location;
    const id = req.body.id;
    Event.updateOne({_id: id},{  name: name, description: description, 
        image: image, date: date, location: location})
        .then(function (result) {
            res.status(200).json({ message: "Event Updated" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Event Update failure" })
        })
});
module.exports = router;