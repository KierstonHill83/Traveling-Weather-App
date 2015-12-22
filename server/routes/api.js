var express = require('express');
var router = express.Router();
var http = require('http');


function weatherService(city, days, response) {
  var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&cnt=' + days+ '&APPID=';
  http.get(url, function(res) {
    var body = "";
    res.on('data', function(chunk) {
      body += chunk;
      console.log("chunk = " + chunk);
    });
    res.on('end', function() {
      console.log("before output");
      try {
        var output = JSON.parse(body);
        console.log("got a response: ", output.list);
        response.json(output.list);
      }
      catch(e) {
        console.log(e);
      }
    });
  }).on('error', function(e) {
    console.log('Got an error:', e);
  });
}

// Weather data from openWeatherAPI
router.get('/recipes/weather/:city/:days', function(req, res, next) {
  var city = req.params.city;
  var days = req.params.days;
  console.log(city);
  weatherService(city, days, res);
});


module.exports = router;