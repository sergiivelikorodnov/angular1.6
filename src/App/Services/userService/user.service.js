angular.module('app').service('UserService', function ($http) {
  this.getUsers = function () {
    return $http.get(USER_API_URL).then((response) => response.data);
  };
});

angular.module('app').service('UserService', function ($http, USER_API_URL) {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';

  this.getUsers = function () {
    return $http.get(USER_API_URL).then((response) => response.data);
  };

  this.getUserById = function (id) {
    return $http.get(`${USER_API_URL}/${id}`).then((response) => response.data);
  };

  this.createUser = function (userData) {
    return $http.post(USER_API_URL, userData).then((response) => response.data);
  };
});
