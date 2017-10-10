var btn = document.getElementById('btn');

window.addEventListener('fetch', function (event) {
    console.log("fetch add event listener");
});

btn.addEventListener('click', function (event) {
    fetch('https://httpbin.org/get')
      .then(data => {console.log(data)})
});
