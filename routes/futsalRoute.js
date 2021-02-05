const express = require('express');
const router = express.Router();
const Futsal = require('../models/futsalModel');
const playerAuth = require('../middleware/playerAuth');

router.post('/futsal/register',playerAuth.verifyUser, playerAuth.verifyOwner, function (req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const image = req.body.image;
    const approve = req.body.approve;
    const data = new Futsal({
        name: name, address: address, phoneNumber: phoneNumber,
        image: image, approve: approve
    })
    data.save()
        .then(function (result){
            // success
            res.status(200).json({message: "Futsal registered successfully"})
        }).catch(function (error){
            res.status(500).json({message: error})
        })
})

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

router.put('/futsal/update', function (req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const image = req.body.image;
    const id = req.body.id;
    Futsal.updateOne({ name: name, address: address, phoneNumber: phoneNumber, image: image, id: id })
        .then(function (result) {
            res.status(200).json({message: "Futsal Updated"})
        })
        .catch(function (err) {
            res.status(500).json({ message: "Update failure"})
        })
})
module.exports = router