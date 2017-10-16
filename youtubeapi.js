//sida med kod : https://github.com/google/google-api-nodejs-client/blob/master/samples/youtube/search.js

var google = require('googleapis');
//var sampleClient = require('sampleclient');
var util = require ('util');
const API_KEY = 'AIzaSyAmQGWe8XGkU0-5j4sbGntxaTVitFHCVc0';

var youtube = google.youtube({
    version: 'v3'
});
var exports = module.exports  = {};

exports.search = function (movieName, movieYear) {
    youtube.search.list({
        part: 'snippet',
        maxResults: 3,
        // Sätter in filmnamnet och året i search Query samt movie trailer. T.ex 'James bond 1998 movie trailer'
        q: `${movieName} ${movieYear} movie trailer`,
        key: API_KEY
    }, function (err, data) {
        if (err) {
            console.error('Error: ' + err);
        }
        if (data) {
            console.log('Youtube search is running')
            //console.log(util.inspect(data, false, null));
        }

    })
};





