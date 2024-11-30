angular.module('app').component('dialogComponent', {
  bindings: {
    title: '@', // One-way binding for the dialog title
    width: '@', // One-way binding for custom width
    onClose: '&', // Callback for the close action
  },
  transclude: true, // Enables content projection
  templateUrl: 'Core/dialog/dialog.component.html', // Use templateUrl for external files
  controller: function ($document, $timeout) {
    var ctrl = this;

    ctrl.$onInit = function () {
      // Ensure that keydown is captured only when the dialog is open
      $document.on('keydown', ctrl.handleKeyDown);
      $timeout(function () {
        // Ensure dialog has focus after it is initialized
        var dialogElement = document.querySelector('.dialog'); // Replace '.dialog' with your dialog class or ID
        if (dialogElement) {
          dialogElement.focus();
        }
      }, 0);
    };

    ctrl.$onDestroy = function () {
      // Clean up the event listener on component destroy
      $document.off('keydown', ctrl.handleKeyDown);
    };

    ctrl.handleKeyDown = function (event) {
      if (event.key === 'Escape') {
        // Close dialog when Escape key is pressed
        ctrl.closeDialog();
      }
    };

    ctrl.closeDialog = function () {
      if (ctrl.onClose) {
        $timeout(() => {
          ctrl.onClose();
        });
      }
    };
  },
});
