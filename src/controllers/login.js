module.exports = function ($scope, $location, AuthService) {

  $scope.loginErrors = [];

  $scope.login = function () {
    AuthService
      .login($scope.email, $scope.password)
      .then(function (user) {
        $location
          .path('/jobs')
          .search({message: 'Welcome ' + user.name})
          .replace();
      })
      .catch(function (error) {
        $scope.loginErrors = [error.message];
      });
  };

};