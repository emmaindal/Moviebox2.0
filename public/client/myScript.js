var snacksBtn = document.getElementById('snacksBtn');
var movieBtn = document.getElementById('movieBtn');

snacksBtn.addEventListener('click', function (event) {
    var displaySnacksElement = document.getElementById('getResult2');
    displaySnacksElement.innerHTML = '';

    axios.get('/showSnacks')
        .then(snacks => {
        var snacksobj = snacks;
        displaySnacksElement.innerHTML = generateSnacksHTMLOutput(snacksobj)
})
});

function generateSnacksHTMLOutput(response) {
    return  '<h5> REKOMENDERAT SNACKS TILL FILMEN </h5>' +
        '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';
;}


movieBtn.addEventListener('click', function (event) {
    // SRC generate html :::: https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237
    var displayMovieElement = document.getElementById('getResult1');
    $('.modal').modal();
    displayMovieElement.innerHTML = '';


    axios.get('/showMovie')
        .then(function (array) {
            // skapar två olika varaibler från listan som returneras från server.js
            // Genererar HTML baserat på tidigare värden
            displayMovieElement.innerHTML = generateMovieHTMLOutput(array.data.movieInfo, array.data.youtubeId);
    })
});

function generateMovieHTMLOutput(movie, youtubeId) {
    var urlPath = "https://www.youtube.com/embed/" + youtubeId;
    return  '<h5> Rekommenderad film </h5>' +
        '<pre>' + '<h6> Titel: ' + JSON.stringify(movie.Title, null, '\t') + '</h6>' + '</pre>' +
        '<pre>' + '<h6> År: ' + JSON.stringify(movie.Year, null, '\t') + '</h6>' + '</pre>' +
        '<pre>' + '<h6> Genre: ' + JSON.stringify(movie.Genre, null, '\t') + '</h6>' + '</pre>' +
        '<pre>' + '<h6> Genre: ' + JSON.stringify(movie.plot, null, '\t') + '</h6>' + '</pre>' +
        // istället för X_68miSOU78 ska en variabel från trailer.xxx.xxx in
        // har ej lyckats utvinna denna från youtubeapi.js
        '<iframe width="400" height="245" src="'+urlPath+'" frameborder="0" allowfullscreen>' + '</iframe>';
}
