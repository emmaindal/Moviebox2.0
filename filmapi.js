const axios = require('axios');
var express = require('express');
const fs = require('fs');
var youtube = require('./youtubeapi.js');

var app = express();

app.use(express.static('./public/client'));

var exports = module.exports = {};
var imdbIdFile = fs.readFileSync('imdb_id.txt', 'UTF-8').toString().split("\r");

exports.findMovie = function (callback) {

    function findMovie() {
        var movieList = imdbIdFile;
        var movieId = movieList[Math.floor(Math.random() * movieList.length)];
        const url = 'http://omdbapi.com/?i=tt' + movieId + '&plot=short' + '&apikey=6397a4d9';

        axios.get(url)
            .then(function (response) {
                // Sorterar ut relevanta filmer ur listan
                if (response.data.imdbRating >= 6.5 && response.data.Year > 1990) {
                    getTrailer(response.data, function (youtubeId) {
                        // Skapar listor med relevant information att skicka till front-end
                        var movieArray = {
                            Title: JSON.stringify(response.data.Title).slice(1, -1),
                            Year: JSON.stringify(response.data.Year).slice(1, -1),
                            Genre: JSON.stringify(response.data.Genre).slice(1, -1),
                            Plot: JSON.stringify(response.data.Plot).slice(1, -1)
                        };
                        var array = {
                            youtubeId: youtubeId,
                            movieInfo: movieArray
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
    console.log('filmtitel: ' + movieData.Title + '....år den släpptes: ' + movieData.Year);
    return youtube.search(movieData.Title, movieData.Year, function (data) {
        var youtubeId = data.items[0].id.videoId;
        callback(youtubeId);
    });
}
