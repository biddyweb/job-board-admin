module.exports = function ($scope, $routeParams, $location, $rootScope, JobService) {

  $scope.job = {};
  $scope.message = null;

  $scope.isNewJob = function () {
    return $routeParams.jobId == 'new';
  };

  $scope.save = function () {
    $scope.message = null;

    JobService
      .save($scope.job)
      .then(function (arguments) {
        $scope.message = { cssClass: 'success', text: arguments[0].message };
        if($routeParams.jobId == 'new') {
          $location
            .path('/jobs')
            .search({notice: 'The job was created succsesfully'});
        } else {
          $location
            .path('/jobs')
            .search({notice: 'The job was updated succsesfully'});
        }
      })
      .catch(function (error) {
        $scope.message = { cssClass: 'danger', text: error.message };
      });
  };
  
  $scope.delete = function () {
    if(!$scope.isNewJob()) {
      JobService
        .remove($scope.job._id)
        .then(function (arguments) {
          $location.path('/jobs');
        })
        .catch(function (error) {
          $scope.message = { cssClass: 'danger', text: error.message };
        });
    }
  };

  if(!$scope.isNewJob()) {
    JobService
      .findOne($routeParams.jobId)
      .then(function (job) {
        $scope.job = job;
      });
  }

};