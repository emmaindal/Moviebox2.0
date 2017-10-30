console.log("Starting server.js");

const express = require('express');
const app = express();
const path = require("path");

var filmapi = require('./filmapi.js');
var matapi = require('./matapi.js');

app.use(express.static('./public/client'));
app.use(express.static('./node_modules/materialize-css/dist'));
app.use(express.static('./node_modules/axios'));

//
// Routes for API.
//
app.get('/getSnacks', function (req, res) {
    // shows all available snacks
    matapi.findSnacks(function (snacks) {
        res.send(snacks);
    })
});

app.get('/getMovie', function (req, res) {
    // generates and displays one movie
    filmapi.findMovie(function (data) {
        res.send(data);
    })
});

app.get('/getSnacks/:snack', function (req, res) {
    // sparar ID från URL
    var snackid = req.params.snack;
    // generar och returnerar specific snack beroende på ID
    matapi.findSpecificSnack(snackid, function (snack) {
        res.send(snack)
    })
});


//routes

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/client/views/index.html'));
});

app.get('/about',function(req,res){
    res.sendFile(path.join(__dirname+'/public/client/views/about.html'));
});

app.get('/docs',function(req,res){
    res.sendFile(path.join(__dirname+'/public/client/views/docs.html'));
});

app.get('/contact',function(req,res){
    res.sendFile(path.join(__dirname+'/public/client/views/contact.html'));
});

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/public/client/views/error404.html'));
});


app.listen(3000, function(){
    console.log("Listening on port 3000");
});
