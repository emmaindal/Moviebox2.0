console.log("Starting matapi.js");
const http = require('http');

module.exports.getFood = (callback, res) => {

    var id = '1583';
    return http.get({
        host: 'matapi.se',
        path: '/foodstuff/' + id
    }, function(response) {
        var body = '';
        response.on('data', function(d){
            body += d;
        });
        response.on('end', function() {
            var dataResponse = JSON.parse(body);

            //for(i = 0; i < dataResponse.length; i++){
            console.log("Snacks: " + dataResponse.name);
            console.log("-------------------------")
            //}

            //}

        });
    });

};
