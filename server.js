var http = require('http');

function getData(callback, res){


  return http.get({
      host: 'matapi.se',
      path: '/foodstuff'
    }, function(response) {
        var body = '';
        response.on('data', function(d){
          body += d;
    });
        response.on('end', function() {
          var dataResponse = JSON.parse(body)
          //res.write(dataResponse);

          for(i = 0; i < dataResponse.length; i++){
            console.log(dataResponse[i])
          }

    });
  });

};
http.createServer(getData).listen(3000);
