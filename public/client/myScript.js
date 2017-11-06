var movieBtn = document.getElementById('movieBtn');
var newMovie = document.getElementById('newMovie');
$(".button-collapse").sideNav();

//
// AXIOS.GET functions
//
function getMovieInformation(callback){
    axios.get('/getMovie')
        .then(function (array) {
            callback(array)
        })
        .catch(function (error) {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                //console.log(error.response.data);
                console.log(error.response.status);
                //console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            }
        });
}

function getSpecificSnack(snackId, callback) {
    axios.get('/getSnacks/' + snackId)
        .then(function (specificSnack){
            callback(specificSnack)
        })
        .catch(function (error) {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                //console.log(error.response.data);
                console.log(error.response.status);
                //console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            }
        });
}

//
// Button click listeners
//
movieBtn.addEventListener('click', function (event) {
    var displayMovieElement = document.getElementById('movieElement');
    var displayTrailerElement = document.getElementById('trailer');
    var displaySnackElement = document.getElementById('snacksElement');
    displayTrailerElement.src = '';
    displayMovieElement.innerHTML = '';
    displaySnackElement.innerHTML = '';

    var removePulseClass = document.getElementById("movieBtn");
    removePulseClass.classList.remove("pulse");

    $('.modal').modal({
        complete: function() {
            var addPulseClass = document.getElementById("movieBtn");
            addPulseClass.classList.add("pulse");
         } // Callback for Modal close
    }
    );

    getMovieInformation(function (array) {
        var randomGenre = randomGenreFromMovie(array.data.movieInfo.Genre);
        clickNewSnack(randomGenre);
        displayMovieElement.innerHTML = generateMovieHTML(array.data.movieInfo, array.data.youtubeId);
    })

});

newMovie.addEventListener('click', function (event) {
    var disableButton = document.getElementById("newMovie");
    disableButton.classList.add("disabled");
    // Axios request from snack and Movie
    getMovieInformation(function(array){
        // Updates the Movie Information
        updateMovieHTML(array.data.movieInfo, array.data.youtubeId);
        // Clears the snack HTML when getting new movie
        var displaySnacksElement = document.getElementById('snacksElement');
        displaySnacksElement.innerHTML = "";
        // Listens for "give me snack" button
        var randomGenre = randomGenreFromMovie(array.data.movieInfo.Genre);
        clickNewSnack(randomGenre);
    })
});


//
// Snack depending on genre functions
//
function randomGenreFromMovie(genre) {
    // Selects one random genre from the total movie genres
    var genreList = genre.split(" ");
    var randomGenre = genreList[Math.floor(Math.random()*genreList.length)];
    // Genre might contain "," if its in the middle of the list. The If solves this
    if (randomGenre.includes(",") === true) {
        return randomGenre.slice(0, -1);
    }

    return randomGenre
}

function clickNewSnack(randomGenre) {
    // Generates a new snack
    //listens for click
    newSnack.addEventListener('click', function (event) {
        var genre = randomGenre;
        randomGenre = [];
        randomSnackFromGenre(genre);
    });
}

function randomSnackFromGenre(genre){
    // Get a random snackID depending on Genre
    var snackId = selectSnackIdFromGenre(genre);
    getSpecificSnack(snackId, function (specificSnack) {
        // displays the snack
        var snack = JSON.stringify(specificSnack.data).slice(1, -1);
        var displaySnacksElement = document.getElementById('snacksElement');
        displaySnacksElement.innerHTML = generateSnacksHTML(snack, genre);
    })
}

function generateRandomId(id) {
    // Selects one random snack for each movie
    return id[Math.floor(Math.random()*id.length)];
}

function selectSnackIdFromGenre(genre){
    // Different snacks depending on genre
    if (genre === 'Action'){
        var snacksIdList = ['1581', '1580', '1583', '1584', '1585', '1848'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Drama'){
        var snacksIdList = ['1579', '1583', '1848'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Comedy'){
        var snacksIdList = ['1581', '1582', '1583', '1584', '1848', '1849'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Thriller'){
        var snacksIdList = [ '1583', '1853', '1852'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Romance'){
        var snacksIdList = ['1583', '526', '2052', '2246', '1858'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Sci-Fi'){
        var snacksIdList = ['1580', '1582', '1583', '1875'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Crime'){
        var snacksIdList = ['1582', '1583', '1585'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Adventure'){
        var snacksIdList = ['1580', '1583', '1584', '1848'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Sport'){
        var snacksIdList = ['1581', '1583', '1584', '1585'];
        return generateRandomId(snacksIdList)
    } else if (genre === 'Documentary'){
        var snacksIdList = ['1579', '1583', '1585', '1875'];
        return generateRandomId(snacksIdList)
    } else {
        var snacksIdList = ['1583', '1584', '1585', '1875', '2246'];
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
    return  '<h5> Kvällens film </h5>' +
        '<h6 id="movieTitle"> Titel: ' + movie.Title + '</h6>' +
        '<h6 id="movieYear"> År: ' + movie.Year + '</h6>'+
        '<h6 id="movieGenre"> Genre: ' + movie.Genre + '</h6>' +
        '<h6 id="moviePlot"> Handling: ' + movie.Plot + '</h6>';
}

function generateSnacksHTML(snack, genre) {
    genre.toLowerCase();
    return  '<h5> Till ' + genre + ' rekommenderar vi </h5>' +
        '<h6>' + snack + '</h6>';
}

function updateMovieHTML(movie, youtubeId) {
    var trailer = document.getElementById('trailer');
    var enableButton = document.getElementById('newMovie');
    enableButton.classList.remove("disabled");
    trailer.src = "https://www.youtube.com/embed/" + youtubeId;

    document.getElementById("movieTitle").innerHTML = 'Titel: ' + movie.Title;
    document.getElementById("movieYear").innerHTML = 'År: ' + movie.Year;
    document.getElementById("movieGenre").innerHTML = 'Genre: ' + movie.Genre;
    document.getElementById("moviePlot").innerHTML = 'Handling: ' + movie.Plot;
}
