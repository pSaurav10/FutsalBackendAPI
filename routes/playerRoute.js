const express = require('express');
const router = express.Router();
const Player = require('../models/playerModel');
const playerAuth = require('../middleware/playerAuth');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs'); //for password encryption
const jwt = require('jsonwebtoken');

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
        const address = req.body.address;
        const phone = req.body.phone;
        const email = req.body.email;
        const dob = req.body.dob;
        const imagepp = req.body.imagepp;
        bcryptjs.hash(password, 10, function (err, hash) {
            const data = new Player({
                fname: fname, lname: lname, username: username,
                password: hash, address: address, phone: phone, email: email,
                dob: dob, imagepp: imagepp
            })
            data.save()
                .then(function (result) {
                    //success
                    res.status(201).json({ message: "Player Registered Successfully" })
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
router.get('/player/login', function (req, res) {
    Player.findOne({ username: req.body.username })
        .then(function (playerData) {
            if (playerData === null) {
                return res.status(401).json({ message: "Username Incorrect!" })
            }
            bcryptjs.compare(req.body.password, playerData.password, function (err, presult) {
                if (presult === false) {
                    return res.status(401).json({ message: "Password Incorrect" })
                }
                //token
                const token = jwt.sign({uid: playerData._id}, 'secretKey');
                res.status(200).json({message: "Authentication Success", token: token})
            
            })
        }).catch()
})
//end of player login


module.exports = router