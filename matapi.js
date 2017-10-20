const axios = require('axios');
var express = require('express');

var app = express();

app.use(express.static('./public/client'));

var exports = module.exports = {};

exports.findSnacks = function (callback) {
    function findSnacks() {
    var snacksId = ['1581', '1580', '1579', '1582', '1583', '1584', '1585' ];
    var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
    const url = 'http://matapi.se/foodstuff/';

    axios.get(url)
        .then(function (response) {
            callback(response.data)
        })
}
    findSnacks();
};


console.log("Starting matapi.js");
