var snacksBtn = document.getElementById('snacksBtn');


snacksBtn.addEventListener('click', function (event) {
    axios.get('/showSnacks')
      .then(data => {
         var obj = data;
         var result = JSON.stringify(obj.data);
         window.alert(result);

      })
=======
var filmapi = require('filmapi.js');
var fetch = require('fetch');

window.addEventListener('fetch', function (event) {
    console.log("fetch add event listener");
});

btn.addEventListener('click', function (event) {
    var hej = fetch(filmapi.getMovie());
    console.log(hej)
    //  .then(data => {console.log(data)})

});


