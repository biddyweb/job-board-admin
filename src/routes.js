module.exports = function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);

  $routeProvider
    .when('/login', {
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
    })
    .when('/jobs', {
      templateUrl: '/views/jobs.html',
      controller: 'JobsCtrl'
    })
    .when('/jobs/:jobId', {
      templateUrl: '/views/job.html',
      controller: 'JobCtrl'
    })
    .otherwise({
      redirectTo: '/login'
    });
};