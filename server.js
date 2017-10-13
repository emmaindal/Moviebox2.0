console.log("Starting server.js");

const http = require('http');
const axios = require('axios');

var express = require('express');
var request = require('request');
var app = express();

const matapi = require('./matapi.js');
const filmapi = require('./filmapi.js');

app.use(express.static('./public/client'));

//routes
app.get('/', function(req, res){
    res.send("Hello World")
})

app.get('/showSnacks', function myFunction(req, res){
    var snacksId = ['1581', '1580', '1579', '1582', '1583', '1584', '1585' ];
    var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];

    const url = 'http://matapi.se/foodstuff/' + randomId;

    axios
    .get(url)
    .then(response => {res.send(response.data.name)})
})

app.get('/showMovie', function (req, res) {
    var movieList = fs.readFileSync('imdb_id.txt', 'UTF-8').toString().split("\r");
    var movieId = movieList[Math.floor(Math.random()*movieList.length)];

    request('http://omdbapi.com/?i=tt' + movieId + '&apikey=6397a4d9', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var dataResponse = JSON.parse(body);
            res.send('Film: ' + dataResponse.Title + '\n' +
            'Årtal ' + dataResponse.Released + '\n' +
            'Genres : ' + dataResponse.Genre);
        }
    })
});

app.listen(3000, function(){
    console.log("Listening on port 3000")
});
