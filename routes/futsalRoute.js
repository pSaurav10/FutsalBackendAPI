const express = require('express');
const router = express.Router();
const Futsal = require('../models/futsalModel');
const playerAuth = require('../middleware/playerAuth');
const upload = require('../middleware/imgUpload')
router.post('/futsal/register',  upload.single('image'), function (req, res) {
    console.log(req.file);
    if(req.file == undefined ){
        res.status(500).json({ message: "File type mismatch"})
    }
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const image = req.file.path;
    const approve = req.body.approve;
    const data = new Futsal({
        name: name, address: address, phoneNumber: phoneNumber,
        image: image, approve: approve
    })
    data.save()
        .then(function (result) {
            // success
            res.status(200).json({ message: "Futsal registered successfully" })
        }).catch(function (error) {
            res.status(500).json({ message: error })
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

router.put('/futsal/update', upload.single('image'), function (req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const image = req.file.path;
    const id = req.body.id;
    Futsal.updateOne({_id: id},{ name: name, address: address, phoneNumber: phoneNumber, image: image })
        .then(function (result) {
            res.status(200).json({ message: "Futsal Updated" })
        })
        .catch(function (err) {
            res.status(500).json({ message: "Update failure" })
        })
})
module.exports = router