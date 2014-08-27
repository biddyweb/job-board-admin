module.exports = function ($scope, $location, AuthService) {

  $scope.registerErrors = [];
  $scope.user = {};

  $scope.register = function () {
    if($scope.form.$valid) {
      AuthService
        .register($scope.user)
        .then(function (arguments) {
          $location
            .path('/jobs')
            .search({message: 'Welcome ' + arguments[1].name })
            .replace();
        })
        .catch(function (error) {
          $scope.registerErrors = [error.message];
        });  
    }

  };

};