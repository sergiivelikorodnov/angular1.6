angular
  .module('app')
  .service(
    'MessageService',
    function ($rootScope, $compile, $document, $templateRequest) {
      var service = this;

      service.showMessage = function (options) {
        // Load the template dynamically
        $templateRequest('templates/message.service.html').then(function (
          template
        ) {
          // Create a new scope for the message dialog
          var scope = $rootScope.$new(true);

          // Pass options to the new scope
          scope.options = options;

          // Compile the template with the new scope
          var element = $compile(template)(scope);

          // Append the compiled element to the DOM
          $document.find('body').append(element);

          // Define confirm and close handlers
          scope.confirm = function () {
            if (options.onConfirm) options.onConfirm();
            scope.close();
          };

          scope.close = function () {
            element.remove();
            scope.$destroy();
            $document.off('keydown', onKeyDown); // Remove keydown listener
          };

          // Keydown handler for Esc key
          function onKeyDown(event) {
            if (event.key === 'Escape' || event.keyCode === 27) {
              scope.close();
              scope.$apply(); // Ensure Angular processes the change
            }
          }

          // Attach keydown event listener to the document
          $document.on('keydown', onKeyDown);
        });
      };
    }
  );
