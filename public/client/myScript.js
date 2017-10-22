var movieBtn = document.getElementById('movieBtn');
var newMovie = document.getElementById('newMovie');

function getSnacksInformation(callback){
    axios.get('/showSnacks')
        .then(function (snacks){
            var snacksobj = JSON.stringify(snacks.data).slice(1,-1);
            callback(snacksobj);
        })
}

function getMovieInformation(callback){
    axios.get('/showMovie')
        .then(function (array) {
            updateMovieHTML(array.data.movieInfo, array.data.youtubeId);
            callback(array.data.movieInfo.Genre)
        })
}


function generateSnacksHTML(response) {
    console.log('här är random snacks:' + compareGenreToSnackId('Action'));
    return  '<h5> Rekommenderat filmsnacks: </h5>' +
    '<h6>' + response + '</h6>';
}

function compareGenreToSnackId(genre){
    if (genre === 'Action'){
        var snacksId = ['1581', '1580', '1583', '1584', '1585', '1848'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    } else if (genre === 'Drama'){
        snacksId = ['1579', '1583', '1848'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    } else if (genre === 'Comedy'){
        snacksId = ['1581', '1582', '1583', '1584', '1848', '1849'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    } else if (genre === 'Thriller'){
        snacksId = [ '1583', '1853', '1852'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    } else if (genre === 'Romance'){
        snacksId = ['1583', '526', '2052', '2246', '1858'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    } else if (genre === 'Sci-Fi'){
        snacksId = ['1580', '1582', '1583', '1875'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    } else if (genre === 'Crime'){
        snacksId = ['1582', '1583', '1585'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    } else if (genre === 'Adventure'){
        snacksId = ['1580', '1583', '1584', '1848'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    } else if (genre === 'Sport'){
        snacksId = ['1581', '1583', '1584', '1585'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    } else if (genre === 'Documentary'){
        snacksId = ['1579', '1583', '1585', '1875'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    } else {
        snacksId = ['1583', '1584', '1585', '1875', '2246'];
        var randomId = snacksId[Math.floor(Math.random()*snacksId.length)];
        return randomId
    }
}


function updateMovieHTML(movie, youtubeId) {
    var trailer = document.getElementById('trailer');
    trailer.src = "https://www.youtube.com/embed/" + youtubeId;

    document.getElementById("movieTitle").innerHTML = 'Titel: ' + movie.Title;
    document.getElementById("movieYear").innerHTML = 'År: ' + movie.Year;
    document.getElementById("movieGenre").innerHTML = 'Genre: ' + movie.Genre;
    document.getElementById("moviePlot").innerHTML = 'Handling: ' + movie.Plot;
}

function generateMovieHTML(movie, youtubeId) {
    var urlPath = "https://www.youtube.com/embed/" + youtubeId;
    var trailer = document.getElementById('trailer');
    trailer.src = urlPath;
    return  '<h5> Rekommenderad film </h5>' +
    '<h6 id="movieTitle"> Titel: ' + movie.Title + '</h6>' +
    '<h6 id="movieYear"> År: ' + movie.Year + '</h6>'+
    '<h6 id="movieGenre"> Genre: ' + movie.Genre + '</h6>' +
    '<h6 id="moviePlot"> Handling: ' + movie.Plot + '</h6>';
}


newMovie.addEventListener('click', function (event) {
    var displaySnacksElement = document.getElementById('getResult2');

    getSnacksInformation(function(snacksobj){
        getMovieInformation(function(array){
            displaySnacksElement.innerHTML = generateSnacksHTML(snacksobj);
            console.log(array);
            console.log(snacksobj);
        })
    })
});


movieBtn.addEventListener('click', function (event) {
    // SRC generate html :::: https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237
    var displayMovieElement = document.getElementById('movieElement');
    var displaySnacksElement = document.getElementById('snacksElement');
    displaySnacksElement.innerHTML = '';
    displayMovieElement.innerHTML = '';

    $('.modal').modal();
    axios.get('/showMovie')
        .then(function (array) {
            displayMovieElement.innerHTML = generateMovieHTML(array.data.movieInfo, array.data.youtubeId);
        })
});

