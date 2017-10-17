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
        .then(movie => {
            var obj = movie;
            displayMovieElement.innerHTML = generateMovieHTMLOutput(obj);
    })
});

function generateMovieHTMLOutput(response) {
    return '<h4> FILMTIPS </h4>' +
        '<pre>' + '<h6>Film:</h6>' + JSON.stringify(response.data.Title, null, '\t') + '</pre>' +
        '<pre>' + '<h6>År:</h6>' + JSON.stringify(response.data.Released, null, '\t') + '</pre>' +
        '<pre>' + '<h6>Genre:</h6>' + JSON.stringify(response.data.Genre, null, '\t') + '</pre>';
}
