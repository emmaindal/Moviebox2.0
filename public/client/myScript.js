var snacksBtn = document.getElementById('snacksBtn');

snacksBtn.addEventListener('click', function (event) {
    axios.get('/showSnacks')
      .then(data => {
         var obj = data;
         var result = JSON.stringify(obj.data);
         window.alert(result);

      })
});
