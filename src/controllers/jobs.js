module.exports = function ($scope, JobService) {
  
  $scope.jobs = [];

  JobService
    .all()
    .then(function (jobs) {
      $scope.jobs = jobs;
    });

};