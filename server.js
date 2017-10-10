console.log("Starting server.js");

var express = require('express');
var app = express();

const matapi = require('./matapi.js');
const filmapi = require('./filmapi.js');


console.log("-------------------------");


matapi.getFood();
filmapi.getMovie();

app.use(express.static('./public/client')
    
);

app.listen(3000);
