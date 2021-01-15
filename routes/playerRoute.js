const express = require('express');
const router = express.Router();
const Player = require('../models/playerModel');


router.post('/register', (req, res) =>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = req.body.age;
    const password = req.body.password;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const dob = req.body.dob;
    const data = new Player({fname: fname, lname: lname, age: age,
    password:password, address: address, phone: phone, email:email,
    dob: dob})
    data.save()
    res.send("Player Registered")
})

module.exports = router