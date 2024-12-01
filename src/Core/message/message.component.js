angular.module('app').component('messageComponent', {
  bindings: {
    title: '@', // Optional title
    text: '@', // Optional text
    mode: '@', // Mode: 'question', 'delete', 'notice'
    onConfirm: '&?', // Emitter for 'Yes' or 'Delete'
    onClose: '&?', // Callback for close action
    width: '@?', // Custom width
  },
  templateUrl: 'Core/message/message.component.html',
  controller: function ($document, $timeout) {
    const ctrl = this;

    ctrl.$onInit = function () {
      $document.on('keydown', ctrl.handleKeyDown);
    };

    ctrl.$onDestroy = function () {
      $document.off('keydown', ctrl.handleKeyDown);
    };

    ctrl.handleKeyDown = function (event) {
      if (event.key === 'Escape') {
        ctrl.closeDialog();
      }
    };

    ctrl.handleYes = function () {
      if (ctrl.onConfirm) {
        ctrl.onConfirm(); // Emit event for 'Yes'
      }
      ctrl.closeDialog();
    };

    ctrl.handleDelete = function () {
      if (ctrl.onConfirm) {
        ctrl.onConfirm(); // Emit event for 'Delete'
      }
      ctrl.closeDialog();
    };

    ctrl.closeDialog = function () {
      if (ctrl.onClose) {
        ctrl.onClose(); // Emit event for closing
      }
    };
  },
});
