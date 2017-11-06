const axios = require('axios');
const express = require('express');

var app = express();

app.use(express.static('./public/client'));

var exports = module.exports = {};



exports.findSnacks = function (callback) {
    // Displays all available snacks from matapi
    function findSnacks() {
        const url = 'http://matapi.se/foodstuff';
        axios.get(url)
            .then(function (response) {
                callback(response.data)
            })
            .catch(function (error) {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    //console.log(error.response.data);
                    console.log(error.response.status);
                    //console.log(error.response.headers);
                    callback('Tyvärr har vi ett problem att nå Matapi just nu.');
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                }
            });
    }
    findSnacks();
};

exports.findSpecificSnack = function (snackid, callback) {
    // Get specific snack depending on snackid
    const url = 'http://matapi.se/foodstuff/' + snackid;
    axios.get(url)
        .then(function (fullInfoFromSpecificSnack) {
            callback(fullInfoFromSpecificSnack.data.name);
        })
        .catch(function (error) {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                callback('Tyvärr har vi ett problem att nå Matapi just nu.');
                //console.log(error.response.data);
                console.log(error.response.status);
                //console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            }
        });
};

console.log("Starting matapi.js");
