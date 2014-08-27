var angular = angular = require('angular-bsfy');
var ngRoute = require('angular-bsfy/route');

var app = angular.module('job-board-admin', [ngRoute.name]);

app.controller('NavigationCtrl', require('./controllers/navigation'));
app.controller('LoginCtrl', require('./controllers/login'));
app.controller('JobsCtrl', require('./controllers/jobs'));
app.controller('JobCtrl', require('./controllers/job'));

app.factory('authInterceptor', require('./interceptors/auth'));
app.factory('AuthService', require('./services/auth'));
app.factory('JobService', require('./services/job'));

app.config(require('./routes')); //Configure the routes
app.config(function ($httpProvider) { //Configure the auth interceptor
  $httpProvider.interceptors.push('authInterceptor');
});