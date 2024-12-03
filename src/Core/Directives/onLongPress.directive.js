angular.module('app').directive('onLongPress', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        onLongPress: '&', // Function to execute on long press
        pressDuration: '@?', // Optional: Specify custom long press duration in milliseconds
      },
      link: function (scope, element) {
        const duration = parseInt(scope.pressDuration) || 500; // Default duration is 500ms
        let pressTimer;

        // Function to start the long press timer
        const startPress = () => {
          pressTimer = $timeout(() => {
            scope.$apply(() => {
              scope.onLongPress();
            });
          }, duration);
        };

        // Function to cancel the long press timer
        const cancelPress = () => {
          if (pressTimer) {
            $timeout.cancel(pressTimer);
          }
        };

        // Attach event listeners for both mouse and touch
        element.on('mousedown touchstart', startPress);
        element.on('mouseup mouseleave touchend touchcancel', cancelPress);

        // Clean up event listeners when the directive is destroyed
        scope.$on('$destroy', () => {
          element.off('mousedown touchstart', startPress);
          element.off('mouseup mouseleave touchend touchcancel', cancelPress);
        });
      },
    };
  },
]);
