angular.module('app').service('UserService', function ($http, USER_API_URL) {
  this.getUsers = function () {
    return $http.get(USER_API_URL).then((response) => response.data);
  };
});
