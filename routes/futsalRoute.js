const express = require('express');
const router = express.Router();
const Futsal = require('../models/futsalModel');

router.post('/futsal/register', function (req, res) {
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
    res.send("Futsal Added")
})

router.delete('/futsal/delete/:id', function (req, res) {
    const id = req.params.id
    Futsal.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ message: "Futsal delted" })
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