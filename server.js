console.log("Starting server.js");

const axios = require('axios');
const express = require('express');
var app = express();

var filmapi = require('./filmapi.js');
var matapi = require('./matapi.js');


app.use(express.static('./public/client'));

//routes
app.get('/showSnacks', function (req, res) {
    matapi.findSnacks(function (snacks) {
        res.send(snacks);
    })
});

app.get('/showMovie', function (req, res) {
    filmapi.findMovie(function (data) {
        res.send(data);
    })
});

app.get('/newMovie', function (req, res) {
    filmapi.findMovie(function (data) {
        res.send(data);
    })
});

app.listen(3000, function(){
    console.log("Listening on port 3000");
});
