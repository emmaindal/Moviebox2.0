var movieBtn = document.getElementById('movieBtn');
var newMovie = document.getElementById('newMovie');


//
// AXIOS.GET functions
//
function getFullSnackInformation(callback){
    axios.get('/showSnacks')
        .then(function (snacks){
            var snacksobj = JSON.stringify(snacks.data).slice(1,-1);
            callback(snacksobj);
        })
}

function getMovieInformation(callback){
    axios.get('/showMovie')
        .then(function (array) {
            callback(array)
        })
}

function getSpecificSnack(snackId, callback) {
    axios.get('/showSnacks/' + snackId)
        .then(function (specificSnack){
            callback(specificSnack)
        })
}

//
// Button click listeners
//
movieBtn.addEventListener('click', function (event) {
    // SRC generate html :::: https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237
    var displayMovieElement = document.getElementById('movieElement');
    displayMovieElement.innerHTML = '';

    $('.modal').modal();
    getMovieInformation(function (array) {
        clickNewSnack(array.data.movieInfo.Genre);
        displayMovieElement.innerHTML = generateMovieHTML(array.data.movieInfo, array.data.youtubeId);
    })
});

newMovie.addEventListener('click', function (event) {
    // Axios request from snack and Movie
    getMovieInformation(function(array){
        // Updates the Movie Information
        updateMovieHTML(array.data.movieInfo, array.data.youtubeId);
        // Clears the snack HTML
        var displaySnacksElement = document.getElementById('snacksElement');
        displaySnacksElement.innerHTML = "";
        // Listens for "give me snack" button
        clickNewSnack(array.data.movieInfo.Genre);
    })
});


//
// Snack depending on genre functions
//
function clickNewSnack(movieGenre) {
    // Generates a new snack
    //listens for click
    newSnack.addEventListener('click', function (event) {
        randomSnackFromGenre(movieGenre);
    });
}

function randomSnackFromGenre(genreList){
    // Get a random snackID depending on Genre
    var snackId = selectSnackIdFromGenre(genreList);

    getSpecificSnack(snackId, function (specificSnack) {
        // displays the snack

        var snack = JSON.stringify(specificSnack.data).slice(1, -1);
        var displaySnacksElement = document.getElementById('snacksElement');
        displaySnacksElement.innerHTML = generateSnacksHTML(snack);
    })
}

function generateRandomId(id) {
    // Selects one random snack for each movie
    return id[Math.floor(Math.random()*id.length)];
}
function randomGenreFromMovie(genre) {
    // takes one random Genre from the movie
    var genreList = genre.split(" ");
    var randomGenre = genreList[Math.floor(Math.random()*genreList.length)];
    if (randomGenre.includes(",") === true) {
        return randomGenre.slice(0, -1);

    }
    return randomGenre
}


function selectSnackIdFromGenre(movieGenres){
    var genre = randomGenreFromMovie(movieGenres);
    // Different snacks depending on genre
    if (genre === 'Action'){
        var snacksIdList = ['1581', '1580', '1583', '1584', '1585', '1848'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Drama'){
        snacksIdList = ['1579', '1583', '1848'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Comedy'){
        snacksIdList = ['1581', '1582', '1583', '1584', '1848', '1849'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Thriller'){
        snacksIdList = [ '1583', '1853', '1852'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Romance'){
        snacksIdList = ['1583', '526', '2052', '2246', '1858'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Sci-Fi'){
        snacksIdList = ['1580', '1582', '1583', '1875'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Crime'){
        snacksIdList = ['1582', '1583', '1585'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Adventure'){
        snacksIdList = ['1580', '1583', '1584', '1848'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Sport'){
        snacksIdList = ['1581', '1583', '1584', '1585'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Documentary'){
        snacksIdList = ['1579', '1583', '1585', '1875'];
        return generateRandomId(snacksIdList)
    } else {
        snacksIdList = ['1583', '1584', '1585', '1875', '2246'];
        console.log('else');
        return generateRandomId(snacksIdList)
    }
}



//
// HTML Generating functions
//
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

function generateSnacksHTML(response) {
    return  '<h5> Rekommenderat filmsnacks: </h5>' +
        '<h6>' + response + '</h6>';
}

function updateMovieHTML(movie, youtubeId) {
    var trailer = document.getElementById('trailer');
    trailer.src = "https://www.youtube.com/embed/" + youtubeId;

    document.getElementById("movieTitle").innerHTML = 'Titel: ' + movie.Title;
    document.getElementById("movieYear").innerHTML = 'År: ' + movie.Year;
    document.getElementById("movieGenre").innerHTML = 'Genre: ' + movie.Genre;
    document.getElementById("moviePlot").innerHTML = 'Handling: ' + movie.Plot;
}


