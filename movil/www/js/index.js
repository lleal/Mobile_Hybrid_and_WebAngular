angular.module('proyecto-prueba', ['ionic', 'ionic-material', 'ionic-datepicker'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.client', {
      url: "/client",
      views: {
        'home-tab': {
          templateUrl: "templates/client.html",
          controller: 'ClientTabCtrl'
        }
      }
    });

   $urlRouterProvider.otherwise("/tab/home");

});

