var app = angular.module('myApp');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  });
}]);

app.controller('MainCtrl', ['$scope', '$http',  '$anchorScroll', 'ClientService', function($scope,  $http, $anchorScroll,  ClientService) {
        
        
}]);
