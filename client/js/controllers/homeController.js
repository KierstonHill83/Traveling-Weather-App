app.controller('homeController', ['$scope', '$http', '$routeParams', '$location', 'weatherService', function($scope, $http, $routeParams, $location, weatherService) {

  $scope.city = weatherService.city;
  $scope.days = '10';

  $scope.$watch('city', function() {
    weatherService.city = $scope.city;
  });

  $scope.getWeather = function() {
    $http.get('/api/weather/' + $scope.city + '/' + $scope.days)
    .then(function(data) {

      $scope.date = data.data[0].dt;
      $scope.dateRes = $scope.date * 1000;
      var newDate = new Date($scope.dateRes);
      $scope.dateResults = newDate.toDateString();
      console.log($scope.dateResults);

      $scope.weather = data.data[0].temp.day;
      $scope.weatherResults = Math.round((1.8 * ($scope.weather - 273)) + 32);

      $scope.firstDescription = data.data[0].weather[0].description;
      $scope.description = capitalize($scope.firstDescription);

    });
  };

  $scope.getWeather();

}]);

///////////////////////
// Helper Functions //
//////////////////////

function capitalize(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}


function weatherIcon(str) {
  var newStr = str.split(' ');
  for (var i = 0; i < newStr.length; i++) {
    if (newStr[i] === 'clear') {
      // append the sun icon
      // <i class="wi wi-day-sunny"></i>
    }
    else if (newStr[i] === 'snow') {
      // append the snow icon
      // <i class="wi wi-snowflake-cold"></i>
    }
    else if (newStr[i] === 'cloud') {
      // append the cloud icon
      // <i class="wi wi-cloudy"></i>
    }
    else if (newStr[i] === 'rain') {
      // append the raindrop icon
      // <i class="wi wi-raindrops"></i>
    }
  }
}