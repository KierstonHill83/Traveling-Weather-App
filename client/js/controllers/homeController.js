app.controller('homeController', ['$scope', '$http', '$routeParams', '$location', 'cityService', function($scope, $http, $routeParams, $location, cityService) {

  $scope.city = cityService.city;
  $scope.days = '1';

  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  });

  $scope.getWeather = function() {
    $http.get('/api/weather/' + $scope.city + '/' + $scope.days)
    .then(function(data) {

      $scope.date = data.data[0].dt;
      $scope.dateRes = $scope.date + 1000;
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
