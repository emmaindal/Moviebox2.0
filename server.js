console.log("Starting server.js");

var express = require('express');
var fetch = require('fetch');
var app = express();

const matapi = require('./matapi.js');
const filmapi = require('./filmapi.js');


console.log("-------------------------");


matapi.getFood();
console.log(filmapi.getMovie());


app.use(express.static('./public/client'));



app.listen(3000);
