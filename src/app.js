const app = angular.module('app', [
  'pascalprecht.translate',
  'ngRoute',
  'app.constants',
]);

// Configure translations
app.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    userId: 'User ID',
    name: 'Name',
    username: 'Username',
    email: 'Email',
  });
  $translateProvider.preferredLanguage('en');
});

// Routing
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/home', {
      templateUrl: 'App/AppComponents/home/home.component.html',
      controller: 'HomeController',
      controllerAs: 'ctrl',
    })
    .otherwise({ redirectTo: '/home' });
});
