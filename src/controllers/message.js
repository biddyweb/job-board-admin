module.exports = function ($rootScope, $scope, $location, $timeout) {

  $scope.message = false;
  $scope.notice = false;

  $rootScope.$on('$routeChangeSuccess', function (event) {
    var search = $location.search();

    var message = search['message'];
    
    if(message) {
      delete search.message;
      $scope.message = message;
      $location.search(search);
      $timeout(function () {
        $scope.message = false;
      }, 1000, true);
    }

    var notice = search['notice'];

    if(notice) {
      delete search.notice;
      $scope.notice = notice;
      $location.search(search);
      $timeout(function () {
        $scope.notice = false;
      }, 1000, true);
    }


  });

};