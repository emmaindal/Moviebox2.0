var http = require('http');

function getData(callback, res){

    var id = '1544';
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
            //res.write(dataResponse)
            // console.log(dataResponse[5].name);

            //for(i = 0; i < dataResponse.length; i++){
            console.log(dataResponse.name);
            //}

            //}

        });
    });

};
http.createServer(getData).listen(3000);
