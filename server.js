console.log("Starting server.js");

const axios = require('axios');
var express = require('express');
const fs = require('fs');
var youtube = require('./youtubeapi.js');

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

    axios.get(url)
        .then(response => {res.send(response.data.name)})
});

app.get('/showMovie', function (req, res) {
    var movieList = fs.readFileSync('imdb_id.txt', 'UTF-8').toString().split("\r");
    var movieId = movieList[Math.floor(Math.random() * movieList.length)];
    const url = 'http://omdbapi.com/?i=tt' + movieId + '&plot=short' + '&apikey=6397a4d9';

    axios.get(url)
        .then(function (response) {
            // kör funktionen getTrailer, detta resulterar i respons med korrekt filminfo i konsoll
            // har ej lyckats få ut datan från youtubeapi.js
            getTrailer(response.data, function (youtubeId) {
                // skapar en lista för att kunna skicka med 2 parametrar med res.send (res.send stödjer endast 1 return värde)
                var array = {
                    youtubeId: youtubeId,
                    movieInfo: response.data
                };
                res.send(array)
            });
        });
});


function getTrailer(movieData, callback) {
    console.log('filmtitel: ' + movieData.Title + ' år den släpptes: ' + movieData.Year);
    return youtube.search(movieData.Title, movieData.Year, function (data) {
        var youtubeId = data.items[0].id.videoId;
        callback(youtubeId);
    });
}


app.listen(3000, function(){
    console.log("Listening on port 3000");
});
