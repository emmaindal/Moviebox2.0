const axios = require('axios');
var express = require('express');
const fs = require('fs');
var youtube = require('./youtubeapi.js');

var app = express();



app.use(express.static('./public/client'));

var exports = module.exports = {};

exports.findMovie = function (callback) {
    function findMovie() {
    var movieList = fs.readFileSync('imdb_id.txt', 'UTF-8').toString().split("\r");
    var movieId = movieList[Math.floor(Math.random() * movieList.length)];
    const url = 'http://omdbapi.com/?i=tt' + movieId + '&plot=short' + '&apikey=6397a4d9';

    axios.get(url)
        .then(function (response) {
            console.log(response.data.imdbRating);
            if (response.data.imdbRating >= 6.5) {

                getTrailer(response.data, function (youtubeId) {
                    // skapar en lista för att kunna skicka med 2 parametrar med res.send (res.send stödjer endast 1 return värde)
                    var array = {
                        youtubeId: youtubeId,
                        movieInfo: response.data
                    };
                    callback(array);
                })
            } else {
                findMovie();
            }


        })
}
    findMovie()
};


function getTrailer(movieData, callback) {
    console.log('filmtitel: ' + movieData.Title + ' år den släpptes: ' + movieData.Year);
    return youtube.search(movieData.Title, movieData.Year, function (data) {
        var youtubeId = data.items[0].id.videoId;
        callback(youtubeId);
    });
}