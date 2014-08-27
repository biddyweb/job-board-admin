module.exports = function ($scope, $location, AuthService) {

  $scope.registerErrors = [];
  $scope.user = {};

  $scope.register = function () {
    AuthService
      .register($scope.user)
      .then(function (arguments) {
        $location.path('/jobs');
      })
      .catch(function (error) {
        $scope.registerErrors = [error.message];
      });
  };

};