module.exports = function ($scope, $location, AuthService) {

  $scope.loginErrors = [];

  $scope.login = function () {
    AuthService
      .login($scope.email, $scope.password)
      .then(function () {
        $location.path('/jobs');
      })
      .catch(function (error) {
        $scope.loginErrors = [error.message];
      });
  };

};