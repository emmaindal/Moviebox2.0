console.log("Starting server.js");

const http = require('http');
const matapi = require('./matapi.js');
const filmapi = require('./filmapi.js');

console.log("-------------------------");

matapi.getFood();
filmapi.getMovie();

http.createServer().listen(3000);
