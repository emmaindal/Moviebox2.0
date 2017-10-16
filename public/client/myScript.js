var snacksBtn = document.getElementById('snacksBtn');
var movieBtn = document.getElementById('movieBtn');

snacksBtn.addEventListener('click', function (event) {
    axios.get('/showSnacks')
        .then(data => {
        var obj = data;
    var result = JSON.stringify(obj.data);
    window.alert(result);

})
});

movieBtn.addEventListener('click', function (event) {
    // SRC generate html :::: https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237
    var displayMovieElement = document.getElementById('getResult1');
    displayMovieElement.innerHTML = '';
    axios.get('/showMovie')
        .then(function (array) {
            // skapar två olika varaibler från listan som returneras från server.js
            var movieInfo = array.data.movieInfo;
            var trailerInfo = array.data.trailerInfo;
            // Genererar HTML baserat på tidigare värden
            displayMovieElement.innerHTML = generateMovieHTMLOutput(movieInfo, trailerInfo);
        })
});

function generateMovieHTMLOutput(movie, trailer) {
    return  '<h4> DIN FILM! </h4>' +
        '<pre>' + JSON.stringify(movie.Title, null, '\t') + '</pre>' +
        '<pre>' + JSON.stringify(movie.Year, null, '\t') + '</pre>' +
        '<pre>' + JSON.stringify(movie.Genre, null, '\t') + '</pre>' +
        // istället för X_68miSOU78 ska en variabel från trailer.xxx.xxx in
        // har ej lyckats utvinna denna från youtubeapi.js
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/X_68miSOU78" frameborder="0" allowfullscreen>' + '</iframe>' ;
}