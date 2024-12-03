angular
  .module('app')
  .service(
    'LoadingService',
    function ($rootScope, $compile, $document, $templateRequest) {
      var service = this;

      // Track the loader state and reference
      var isBusy = false;
      var loaderElement = null;

      // Show the loader
      service.isBusyYes = function () {
        if (isBusy) return; // Prevent multiple loaders
        isBusy = true;

        // Load the template dynamically
        $templateRequest('templates/loading.service.html').then(function (
          template
        ) {
          var scope = $rootScope.$new(); // Create a new isolated scope
          loaderElement = $compile(template)(scope); // Compile the template
          $document.find('body').append(loaderElement); // Append to the body
        });
      };

      // Hide the loader
      service.isBusyNo = function () {
        if (!isBusy) return;
        isBusy = false;

        // Remove the loader element if it exists
        if (loaderElement) {
          loaderElement.remove();
          loaderElement = null;
        }
      };
    }
  );
