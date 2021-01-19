const express = require('express');
const router = express.Router();
const Player = require('../models/playerModel');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

router.post('/user/register', [
    check('fname', 'First Name is required!').not().isEmpty(),
    check('username', 'Username is required!').not().isEmpty(),
    check('password', 'Password is required!').not().isEmpty(),
    check('email', 'Email is required!').not().isEmpty(),
    check('email', 'It is not valid Email!').isEmail(),
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()){
        const fname = req.body.fname;
        const lname = req.body.lname;
        const username = req.body.username;
        const password = req.body.password;
        const address = req.body.address;
        const phone = req.body.phone;
        const email = req.body.email;
        const dob = req.body.dob;
        const imagepp = req.body.imagepp;
        bcryptjs.hash(password, 10, function(err, hash){
            const data = new Player({
                fname: fname, lname: lname, username: username,
                password: hash, address: address, phone: phone, email: email,
                dob: dob, imagepp: imagepp
            })
            data.save()
            res.send("Player Registered")
        })
       
    }
    else {
        res.send(errors.array())
    }
})

module.exports = router