const app = angular.module('app', [
  'pascalprecht.translate',
  'ngRoute',
  'app.constants',
]);

// Configure translations
app.config(function ($translateProvider, $translateSanitizationProvider) {
  // Define translations
  $translateProvider.useStaticFilesLoader({
    prefix: '/i18n/', // Path to translation files
    suffix: '.json', // File extension
  });

  // Default language
  $translateProvider.preferredLanguage('en');

  // Configure sanitization strategy
  $translateSanitizationProvider.useStrategy('sanitizeParameters'); // Use 'sanitize' or 'escape' as needed
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

// Main application controller for language switching
app.controller('AppController', function ($translate) {
  const ctrl = this;

  ctrl.langKey = 'en';
  ctrl.changeLanguage = function (langKey) {
    $translate.use(langKey);
    ctrl.langKey = langKey;
  };
});
