var google = require('googleapis');
const API_KEY = 'AIzaSyAmQGWe8XGkU0-5j4sbGntxaTVitFHCVc0';

var youtube = google.youtube({
    version: 'v3'
});
var exports = module.exports  = {};

exports.search = function(movieName, movieYear, callback) {
    youtube.search.list({
        part: 'snippet',
        maxResults: 1,
        // Sätter in filmnamnet och året i search Query samt movie trailer. T.ex 'James bond 1998 movie trailer'
        q: `${movieName} ${movieYear} movie trailer`,
        key: API_KEY
    }, function (err, data) {
        if (err) {
            console.error('Error: ' + err);
        }
        if (data) {
            console.log('Youtube search is running');
            callback(data)
        }
    })
};

console.log('Starting youtubeapi.js');