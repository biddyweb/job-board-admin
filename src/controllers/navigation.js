module.exports = function ($scope, $location, AuthService) {

  $scope.logout = function () {
    AuthService
      .logout()
      .then(function (message) {
        $location.path('/login');
      });
  };

  $scope.isAuthenticated = AuthService.isAuthenticated;
  
}