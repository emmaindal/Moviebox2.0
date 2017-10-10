console.log("Starting filmapi.js");
const http = require('http');
const fs = require('fs');

module.exports.getMovie = (callback, res) => {
    // Fast and Furious 10 verkar vara senast tillagda. ID 5433140
    // Slumpar ett nummer mellan 1000000 och 5433140
    // bör vara sortering efter error då alla värden inte har film
    // bör även vara sortering efter TYPE då episoder och filmer delar id
    //var movieId =  Math.floor(Math.random() * 5433140);

    //Fil med 9000imdb ID läses in. Görs till lista. Slumpar lista
    var movieList = fs.readFileSync('imdb_id.txt', 'UTF-8').toString().split("\r");
    var movieId = movieList[Math.floor(Math.random()*movieList.length)];
    //var title = 'Titanic';

    return http.get({
        host: 'omdbapi.com',
        path: '/?i=tt' + movieId + '&apikey=6397a4d9'
    }, function(response) {
        var body = '';
        response.on('data', function(d){
            body += d;
        });
        response.on('end', function() {
            var dataResponse = JSON.parse(body);
            console.log('Film: ' + dataResponse.Title + '\n' +
                'Årtal ' + dataResponse.Released + '\n' +
                'Genres : ' + dataResponse.Genre);
        });
    });

}
