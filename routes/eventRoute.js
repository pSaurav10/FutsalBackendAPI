const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const playerAuth = require('../middleware/playerAuth');
const { check, validationResult } = require('express-validator');
const upload = require('../middleware/imgUpload')

//Event Add
router.post('/event/add', upload.single('image'), function (req, res){
    const name = req.body.name;
    const description = req.body.description;
    const image = req.file.path;
    const date = req.body.date;
    const location = req.body.location;
    const data = new Event({
        name: name, description: description, image: image, date: date,
        location: location
    })
    data.save()
    .then(function (result) {
        // success
        res.status(200).json({ message: "Futsal registered successfully" })
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