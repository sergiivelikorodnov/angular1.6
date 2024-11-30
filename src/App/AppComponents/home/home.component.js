app.controller('HomeController', function (UserService) {
  const ctrl = this;

  ctrl.showDialog = false;
  ctrl.dialogData = null;

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
      case 'dblClick': {
        ctrl.dialogData = dataItem;
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
    ctrl.dialogData = null;
  };
});
