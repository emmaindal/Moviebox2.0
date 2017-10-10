console.log("Starting matapi.js");

const http = require('http');

module.exports.getFood = (callback, res) => {
    // diverse snacksID från matapis hemsida, bör kompletteras.
    var snacksId = ['1581', '1580', '1579', '1582', '1583', '1584', '1585' ];
    var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];

    return http.get({
        host: 'matapi.se',
        path: '/foodstuff/' + randomId
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

        });
    });
}
