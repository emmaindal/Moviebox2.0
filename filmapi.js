console.log("Starting filmapi.js");
const http = require('http');

module.exports.getMovie = (callback, res) => {
    // Fast and Furious 10 verkar vara senast tillagda. ID 5433140
    // Slumpar ett nummer mellan 1000000 och 5433140
    // bör vara sortering efter error då alla värden inte har film
    // bör även vara sortering efter TYPE då episoder och filmer delar id
    var movieId = 1000000 + Math.floor(Math.random() * 5433140);
    console.log(movieId)
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
            console.log(dataResponse);
            //for(i = 0; i < dataResponse.length; i++){


        });
    });

}