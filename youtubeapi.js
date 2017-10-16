//sida med kod : https://github.com/google/google-api-nodejs-client/blob/master/samples/youtube/search.js

var google = require('googleapis');
//var sampleClient = require('sampleclient');
var util = require ('util');
const API_KEY = 'AIzaSyAmQGWe8XGkU0-5j4sbGntxaTVitFHCVc0';

var youtube = google.youtube({
    version: 'v3',
});

var movieResponse = 

function search () {
    youtube.search.list({
        part: 'snippet',
        maxResults: 3,
        q: 'Particula',
        key: API_KEY
    }, function (err, data){
        if (err){
            console.error('Error: '  + err);
        }
        if (data) {
            console.log(util.inspect(data, false, null));
        }
        process.exit();
    });
}

search() 


