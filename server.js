console.log("Starting server.js");

const axios = require('axios');
var express = require('express');
var app = express();

var filmapi = require('./filmapi.js');

app.use(express.static('./public/client'));

//routes
app.get('/showSnacks', function myFunction(req, res){
    var snacksId = ['1581', '1580', '1579', '1582', '1583', '1584', '1585' ];
    var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
    const url = 'http://matapi.se/foodstuff/' + randomId;

    axios.get(url)
        .then(response => {res.send(response.data.name)})
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
