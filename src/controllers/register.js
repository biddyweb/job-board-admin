module.exports = function ($scope, AuthService) {

  $scope.registerErrors = [];
  $scope.user = {};

  $scope.register = function () {

    AuthService
      .register($scope.user)
      .then(function (arguments) {

      })
      .catch(function (errors) {
        $scope.registerErrors = errors;
      });

  };

};