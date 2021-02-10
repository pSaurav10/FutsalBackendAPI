const express = require('express');
const router = express.Router();
const Futsal = require('../models/futsalModel');
const playerAuth = require('../middleware/playerAuth');
const { check, validationResult } = require('express-validator');
const upload = require('../middleware/imgUpload')

// Futsal Register
router.post('/futsal/register',[
    check('name', 'Name is required!').not().isEmpty(),
    check('address', 'Address is required!').not().isEmpty(),
    check('phoneNumber', 'Phone Number is required!').not().isEmpty(),
    check('image', 'Futsal Image is required').not().isEmpty(),
    check('description', 'Give a little description on your Futsal').not().isEmpty()
], upload.single('image'), function (req, res) {
    const errors = validationResult(req);
    if(req.file == undefined ){
        res.status(500).json({ message: "File type mismatch"})
    }
    if(errors.isEmpty()){
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const description = req.body.description;
    const image = req.file.path;
    const review = req.body.review;
    const grounds = req.body.grounds;
    const approve = req.body.approve;
    const data = new Futsal({
        name: name, address: address, phoneNumber: phoneNumber, description: description,
        image: image, review: review, grounds: grounds , approve: approve
    })
    data.save()
        .then(function (result) {
            // success
            res.status(200).json({ message: "Futsal registered successfully" })
        }).catch(function (error) {
            res.status(500).json({ message: error })
        })
    }
    else{
        res.status(500).json(errors.array())
    }
})

// Futsal Delete
router.delete('/futsal/delete/:id', function (req, res) {
    const id = req.params.id
    Futsal.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ message: "Futsal deleted" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Cannot delete Futsal" })
        })
})


// Futsal update
router.put('/futsal/update', upload.single('image'), function (req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const description = req.body.description;
    const image = req.file.path;
    const review = req.body.review;
    const grounds = req.body.grounds;
    const id = req.body.id;
    Futsal.updateOne({_id: id},{ name: name, address: address, phoneNumber: phoneNumber,
        description:description, image: image, review: review, grounds:grounds})
        .then(function (result) {
            res.status(200).json({ message: "Futsal Updated" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Update failure" })
        })
})
module.exports = router