console.log("Starting server.js");

const axios = require('axios');
var express = require('express');
const fs = require('fs');

var app = express();

app.use(express.static('./public/client'));

//routes
app.get('/', function(req, res){
    res.send("Hello World")
});

app.get('/showSnacks', function myFunction(req, res){
    var snacksId = ['1581', '1580', '1579', '1582', '1583', '1584', '1585' ];
    var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
    const url = 'http://matapi.se/foodstuff/' + randomId;

    axios
        .get(url)
        .then(response => {res.send(response.data.name)})
});

app.get('/showMovie', function (req, res) {
    var movieList = fs.readFileSync('imdb_id.txt', 'UTF-8').toString().split("\r");
    var movieId = movieList[Math.floor(Math.random()*movieList.length)];
    const url = 'http://omdbapi.com/?i=tt' + movieId + '&apikey=6397a4d9';
    axios
        .get(url)
        .then(response => {res.send(response.data)})
});

app.listen(3000, function(){
    console.log("Listening on port 3000")
});
