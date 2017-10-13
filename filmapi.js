console.log("Starting filmapi.js");
const http = require('http');
const fs = require('fs');
const fetch = require('node-fetch');
/*
module.exports.getMovie = (callback, res) => {
    //Fil med 9000imdb ID läses in. Görs till lista. Slumpar lista
    var movieList = fs.readFileSync('imdb_id.txt', 'UTF-8').toString().split("\r");
    var movieId = movieList[Math.floor(Math.random()*movieList.length)];

    var hej = fetch('http://omdbapi.com/?i=tt'+ movieId + '&apikey=6397a4d9')
        // Hämtar info från omdbapi
        // när fetch är klart kör den funktionen som tar en variabel (response från fetch)
        // och .json omvandlar den till till json
        // SRC ::: http://blogs.missouristate.edu/cio/2016/01/14/fetching-data-over-http-with-nodejs-using-node-fetch/
        .then(function(movieInfo){
            return movieInfo.json();
        })
        .then(function(json){
            console.log('Film: ' + json.Title + '\n' +
                'Årtal: ' + json.Released + '\n' +
                'Genres : ' + json.Genre);
        });
}*/