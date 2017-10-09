console.log("Starting filmapi.js");
const http = require('http');

module.exports.getMovie = (callback, res) => {

    //var title = 'Titanic';
    return http.get({
        host: 'omdbapi.com',
        path: '/?t=titanic&apikey=6397a4d9'
    }, function(response) {
        var body = '';
        response.on('data', function(d){
            body += d;
        });
        response.on('end', function() {
            var dataResponse = JSON.parse(body);
            console.log("Film: " + dataResponse.Title);
            //for(i = 0; i < dataResponse.length; i++){


        });
    });

};
