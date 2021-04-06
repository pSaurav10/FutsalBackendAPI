const express = require('express');
const router = express.Router();
const Player = require('../models/playerModel');
const playerAuth = require('../middleware/playerAuth');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs'); //for password encryption
const jwt = require('jsonwebtoken');
const upload = require('../middleware/imgUpload')

//player register
router.post('/player/register', [
    check('fname', 'First Name is required!').not().isEmpty(),
    check('username', 'Username is required!').not().isEmpty(),
    check('password', 'Password is required!').not().isEmpty(),
    check('email', 'Email is required!').not().isEmpty(),
    check('email', 'It is not valid Email!').isEmail(),
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const username = req.body.username;
        const password = req.body.password;
        const userType = req.body.userType;
        const address = req.body.address;
        const phone = req.body.phone;
        const email = req.body.email;
        const dob = req.body.dob;
        bcryptjs.hash(password, 10, function (err, hash) {
            const data = new Player({
                fname: fname, lname: lname, username: username,
                password: hash, userType: userType, address: address, phone: phone, email: email,
                dob: dob
            })
            data.save()
                .then(function (result) {
                    //success
                    res.status(201).json({ success: true, message: "User Registered Successfully" })
                }).catch(function (e) {
                    res.status(500).json({ message: e })
                })
        })
    }
    else {
        res.status(400).json(errors.array())
    }
})
//end of player register

//Player login
router.post('/player/login', function (req, res) {

    Player.findOne({ username: req.body.username })
        .then(function (playerData) {
            if (playerData === null) {
                return res.status(401).json({ success: false, message: "Username Incorrect!" })
            }
            bcryptjs.compare(req.body.password, playerData.password, function (err, presult) {
                if (presult === false) {
                    return res.status(401).json({ success: false, message: "Password Incorrect" })
                }
                //token
                const token = jwt.sign({ uid: playerData._id }, 'secretKey');
                res.status(200).json({ success: true, token: token, data: playerData, message: "Authentication Success" })

            })
        }).catch(function (e) {
            res.status(500).json({ message: e })
        })
})
//end of player login


router.get('/profile', playerAuth.verifyUser, function (req, res) {
    Player.findOne({ _id: req.user._id })
    .then(function (playerData) {
        res.status(200).json({data:playerData})
    })

})

module.exports = router