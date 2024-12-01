app.controller('HomeController', function (UserService, $timeout) {
  const ctrl = this;

  ctrl.showDialog = false;
  ctrl.deleteDialogVisible = false;
  ctrl.currentUser = null;

  ctrl.users = [];
  ctrl.error = null;

  ctrl.$onInit = function () {
    ctrl.fetchUsers();
  };

  ctrl.fetchUsers = function () {
    UserService.getUsers()
      .then(function (users) {
        ctrl.users = users;
      })
      .catch(function (error) {
        ctrl.error = 'Failed to load users. Please try again later.';
        console.error('Error fetching users:', error);
      });
  };

  ctrl.gridSettings = {
    ComponentName: 'GridName',
    Fields: [
      {
        FieldName: 'id',
        FieldType: 'number',
        FieldWidth: 100,
        FieldLabel: 'userId',
      },
      {
        FieldName: 'name',
        FieldType: 'string',
        FieldWidth: 150,
        FieldLabel: 'name',
      },
      {
        FieldName: 'username',
        FieldType: 'string',
        FieldWidth: 180,
        FieldLabel: 'username',
      },
      {
        FieldName: 'email',
        FieldType: 'string',
        FieldWidth: 200,
        FieldLabel: 'email',
      },
    ],
  };

  ctrl.handleRowEvent = function ({ operation, dataItem }) {
    switch (operation) {
      case 'selection': {
        $timeout(() => {
          ctrl.currentUser = dataItem;
        });
        break;
      }
      case 'dblClick': {
        ctrl.currentUser = dataItem;
        ctrl.showDialog = true;
        break;
      }

      case 'cancel': {
        ctrl.handleDialogClose();
        break;
      }
    }
  };

  ctrl.handleDialogClose = function () {
    ctrl.showDialog = false;
    ctrl.currentUser = null;
  };

  ctrl.deleteUser = function () {
    ctrl.deleteDialogVisible = true;
  };

  ctrl.handleClose = function () {
    ctrl.deleteDialogVisible = false;
  };
});
