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
      $scope.dateResults = $scope.date + 1000;

      $scope.weather = data.data[0].temp.day;
      $scope.weatherResults = Math.round((1.8 * ($scope.weather - 273)) + 32);

    });
  };

  $scope.getWeather();

}]);