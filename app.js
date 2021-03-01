const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const cors = require('cors');
const path = require("path");
const player_route = require('./routes/playerRoute')
const futsalRoute = require('./routes/futsalRoute')
const communityRoute = require('./routes/communityRoute')

var app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'images')))
app.use(cors());
app.use(player_route)
app.use(futsalRoute)
app.use(communityRoute)





app.listen(8080);