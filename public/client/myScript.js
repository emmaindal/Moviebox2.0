var movieBtn = document.getElementById('movieBtn');
var newMovie = document.getElementById('newMovie');

newMovie.addEventListener('click', function (event) {
    var displaySnacksElement = document.getElementById('getResult2');

    function snacks(callback){
        axios.get('/showSnacks')
        .then(function (snacks){
            var snacksobj = JSON.stringify(snacks.data[1].name).slice(1,-1);
            displaySnacksElement.innerHTML = generateSnacksHTMLOutput(snacksobj)
            callback(snacksobj);
        })
    }

    function movie(callback){
        axios.get('/showMovie')
        .then(function (array) {
            updateMovieInfo(array.data.movieInfo, array.data.youtubeId)
            callback(array.data.movieInfo.Genre)
        })
    }

    snacks(function(snacksobj){
        movie(function(array){
            console.log(array)
            console.log(snacksobj)
        })
    })
});

function generateSnacksHTMLOutput(response) {
    return  '<h5> Rekommenderat filmsnacks: </h5>' +
    '<h6>' + response + '</h6>';
}

function generateRandomSnacks(genre, snacks){

}

movieBtn.addEventListener('click', function (event) {
    // SRC generate html :::: https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237
    var displayMovieElement = document.getElementById('getResult1');
    var displaySnacksElement = document.getElementById('getResult2');

    displaySnacksElement.innerHTML = '';

    $('.modal').modal();
    displayMovieElement.innerHTML = '';

    axios.get('/showMovie')
    .then(function (array) {
        displayMovieElement.innerHTML = generateMovieHTMLOutput(array.data.movieInfo, array.data.youtubeId);
    })
});

function updateMovieInfo(movie, youtubeId) {
    var urlPath = "https://www.youtube.com/embed/" + youtubeId;
    var trailer = document.getElementById('trailer');
    trailer.src = urlPath;
    document.getElementById("movieTitle").innerHTML = 'Titel: ' + movie.Title;
    document.getElementById("movieYear").innerHTML = 'År: ' + movie.Year;
    document.getElementById("movieGenre").innerHTML = 'Genre: ' + movie.Genre;
    document.getElementById("moviePlot").innerHTML = 'Handling: ' + movie.Plot;
}

function generateMovieHTMLOutput(movie, youtubeId) {
    var urlPath = "https://www.youtube.com/embed/" + youtubeId;
    var trailer = document.getElementById('trailer');
    trailer.src = urlPath;
    return  '<h5> Rekommenderad film </h5>' +
    '<h6 id="movieTitle"> Titel: ' + movie.Title + '</h6>' +
    '<h6 id="movieYear"> År: ' + movie.Year + '</h6>'+
    '<h6 id="movieGenre"> Genre: ' + movie.Genre + '</h6>' +
    '<h6 id="moviePlot"> Handling: ' + movie.Plot + '</h6>';
}
