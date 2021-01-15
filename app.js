const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const player_route = require('./routes/playerRoute')

var app = express();
app.use(express.json())
app.use(player_route)
app.use(bodyParser.urlencoded({extended: false}))




app.listen(8080);