angular.module('app').component('gridComponent', {
  bindings: {
    gridSettings: '<',
    data: '<',
    selectedItem: '<',
    onRowEvent: '&',
  },
  templateUrl: 'Core/CoreComponents/grid/grid.component.html',
  controller: function ($document, $scope) {
    // Inject $scope
    const ctrl = this;

    ctrl.selectedItem = null;

    ctrl.getTotalWidth = function () {
      const totalWidth = ctrl.gridSettings.Fields.reduce(
        (total, field) => total + (field.FieldWidth || 150),
        0
      );
      return totalWidth > 0 ? totalWidth : 1;
    };

    ctrl.getProportionalWidth = function (fieldWidth) {
      const totalWidth = ctrl.getTotalWidth();
      return (fieldWidth / totalWidth) * 100;
    };

    ctrl.$onInit = function () {
      ctrl.gridSettings.Fields.forEach((field) => {
        field.FieldWidth = field.FieldWidth || 150;
      });

      ctrl.gridHeightStyle = ctrl.gridSettings.GridHeight
        ? { '--grid-height': `${ctrl.gridSettings.GridHeight}px` }
        : { '--grid-height': '100%' }; // Apply 100% height when GridHeight is undefined

      $document.on('keydown', ctrl.handleKeyDown);
    };

    ctrl.$onDestroy = function () {
      $document.off('keydown', ctrl.handleKeyDown);
    };

    ctrl.$onChanges = function (changes) {
      if (changes?.selectedItem?.currentValue == null) {
        ctrl.selectedItem = null;
        ctrl.selectedRowId = null;
      }
    };

    ctrl.handleKeyDown = function (event) {
      if (event.key === 'Escape' && ctrl.selectedItem) {
        // Use $scope.$apply to trigger digest cycle
        ctrl.onRowEvent({
          $event: { operation: 'cancel', dataItem: ctrl.selectedItem },
        });
        $scope.$apply(() => {
          ctrl.selectedItem = null;
          ctrl.selectedRowId = null;
        });
      }
    };

    ctrl.rowClick = function (item) {
      ctrl.selectedItem = item;
      ctrl.selectedRowId = item.id;
      ctrl.onRowEvent({
        $event: { operation: 'selection', dataItem: item },
      });
    };

    ctrl.rowDblClick = function (item) {
      ctrl.onRowEvent({
        $event: { operation: 'dblClick', dataItem: item },
      });
    };

    // Long press handler
    ctrl.rowLongPress = function (item) {
      console.log('It was LongPress:', item);
      ctrl.onRowEvent({
        $event: { operation: 'longPress', dataItem: item },
      });
    };
  },
});
