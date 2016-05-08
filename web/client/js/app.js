'use strict';
var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'mgcrea.ngStrap']);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main'});
}]);