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
    var urlPath = "https://www.youtube.com/embed/" + youtubeId
    return  '<h4> DIN FILM! </h4>' +
        '<pre>' + JSON.stringify(movie.Title, null, '\t') + '</pre>' +
        '<pre>' + JSON.stringify(movie.Year, null, '\t') + '</pre>' +
        '<pre>' + JSON.stringify(movie.Genre, null, '\t') + '</pre>' +
        // istället för X_68miSOU78 ska en variabel från trailer.xxx.xxx in
        // har ej lyckats utvinna denna från youtubeapi.js
        '<iframe width="560" height="315" src="'+urlPath+'" frameborder="0" allowfullscreen>' + '</iframe>';
}
