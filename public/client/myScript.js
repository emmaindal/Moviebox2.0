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
        .then(movie => {
            var obj = movie;
            displayMovieElement.innerHTML = generateMovieHTMLOutput(obj);
    }
});

function generateMovieHTMLOutput(response) {
    return  '<h4> DIN FILM! </h4>' +
        '<pre>' + JSON.stringify(response.data.Title, null, '\t') + '</pre>' +
        '<pre>' + JSON.stringify(response.data.Released, null, '\t') + '</pre>' +
        '<pre>' + JSON.stringify(response.data.Genre, null, '\t') + '</pre>';
}