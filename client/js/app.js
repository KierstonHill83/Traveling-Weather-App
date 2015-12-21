var app = angular.module('travelingWeather', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      access: {restricted: false},
      controller: 'myTravelingWeather',
      redirectTo: '/home'
    })
    .when('/home', {
      templateUrl: '/views/partials/home',
      controller: 'homeController',
      access: {restricted: false}
    })
    .otherwise({
      redirectTo: '/'
    });
});
