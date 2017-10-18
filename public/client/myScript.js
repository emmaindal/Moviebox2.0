var snacksBtn = document.getElementById('snacksBtn');
var movieBtn = document.getElementById('movieBtn');

snacksBtn.addEventListener('click', function (event) {
    var displaySnacksElement = document.getElementById('getResult2');
    displaySnacksElement.innerHTML = '';

    axios.get('/showSnacks')
        .then(snacks => {
        var snacksobj = JSON.stringify(snacks.data).replace(/\"/g, "");
        displaySnacksElement.innerHTML = generateSnacksHTMLOutput(snacksobj)
})
});

function generateSnacksHTMLOutput(response) {
    return  '<h5> REKOMENDERAT SNACKS TILL FILMEN </h5>' +
        '<pre>' + response + '</pre>';
}


movieBtn.addEventListener('click', function (event) {
    // SRC generate html :::: https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237
    var displayMovieElement = document.getElementById('getResult1');
    $('.modal').modal();
    displayMovieElement.innerHTML = '';

    axios.get('/showMovie')
        .then(function (array) {
            // Tar bort citattecken fron JSON.stringify
            var movieArray = {
                Title : JSON.stringify(array.data.movieInfo.Title).replace(/\"/g, ""),
                Year : JSON.stringify(array.data.movieInfo.Year).replace(/\"/g, ""),
                Genre : JSON.stringify(array.data.movieInfo.Genre).replace(/\"/g, ""),
                Plot : JSON.stringify(array.data.movieInfo.Plot).replace(/\"/g, "")
            };

            displayMovieElement.innerHTML = generateMovieHTMLOutput(movieArray, array.data.youtubeId);
    })
});

function generateMovieHTMLOutput(movie, youtubeId) {
    var urlPath = "https://www.youtube.com/embed/" + youtubeId;
    return  '<h5> Rekommenderad film </h5>' +
        '<pre>' + '<h6> Titel: ' + movie.Title + '</h6>' + '</pre>' +
        '<pre>' + '<h6> År: ' + movie.Year + '</h6>' + '</pre>' +
        '<pre>' + '<h6> Genre: ' + movie.Genre + '</h6>' + '</pre>' +
        '<pre>' + '<h6> Plot: ' + movie.Plot + '</h6>' + '</pre>' +
        '<iframe width="400" height="245" src="'+urlPath+'" frameborder="0" allowfullscreen>' + '</iframe>';
}
