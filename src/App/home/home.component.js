app.controller('HomeController', function () {
  const ctrl = this;

  ctrl.showDialog = false;
  ctrl.dialogData = null;

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
        FieldName: 'userName',
        FieldType: 'string',
        FieldWidth: 180,
        FieldLabel: 'userName',
      },
      {
        FieldName: 'email',
        FieldType: 'string',
        FieldWidth: 200,
        FieldLabel: 'email',
      },
    ],
  };

  ctrl.gridData = [
    {
      id: 1,
      name: 'Sergii',
      userName: 'Caesar',
      email: 'inthe7heaven@gmail.com',
    },
    {
      id: 2,
      name: 'Sergii2',
      userName: 'Caesar2',
      email: 'inthe7heaven2@gmail.com',
    },
    {
      id: 3,
      name: 'Sergii3',
      userName: 'Caesar3',
      email: 'inthe7heaven3@gmail.com',
    },
  ];

  ctrl.handleRowEvent = function ({ operation, dataItem }) {
    switch (operation) {
      case 'dblClick': {
        ctrl.dialogData = dataItem;
        ctrl.showDialog = true;
        break;
      }
      //   case 'cancel': {
      //     ctrl.handleDialogClose();
      //     break;
      //   }
    }
  };

  ctrl.handleDialogClose = function () {
    ctrl.showDialog = false;
    ctrl.dialogData = null;
  };
});
