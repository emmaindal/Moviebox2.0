var btn = document.getElementById('btn');

var filmapi = require('filmapi.js');
var fetch = require('fetch');

window.addEventListener('fetch', function (event) {
    console.log("fetch add event listener");
});

btn.addEventListener('click', function (event) {
    var hej = fetch(filmapi.getMovie());
    console.log(hej)
    //  .then(data => {console.log(data)})
});


