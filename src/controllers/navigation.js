module.exports = function ($scope, $location, AuthService) {

  $scope.logout = function () {
    AuthService
      .logout()
      .then(function (message) {
        $location
          .path('/login')
          .search({notice: 'Good bye!'})
          .replace();
      });
  };

  $scope.isAuthenticated = AuthService.isAuthenticated;
  
}