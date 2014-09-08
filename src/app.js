var angular = require('angular-bsfy'),
    ngRoute = require('angular-bsfy/route'),
    ngSanitize = require('angular-bsfy/sanitize');

var app = angular.module('job-board-admin', [ngRoute.name, ngSanitize.name]);

app.controller('NavigationCtrl', require('./controllers/navigation'));
app.controller('LoginCtrl', require('./controllers/login'));
app.controller('JobsCtrl', require('./controllers/jobs'));
app.controller('JobCtrl', require('./controllers/job'));
app.controller('RegisterCtrl', require('./controllers/register'));
app.controller('MessageCtrl', require('./controllers/message'));

app.factory('authInterceptor', require('./interceptors/auth'));
app.factory('loaderInterceptor', require('./interceptors/loader'));
app.factory('AuthService', require('./services/auth'));
app.factory('JobService', require('./services/job'));

app.directive('marked', require('./directives/marked'));

app.value('serviceUrl', '{serviceUrl}');

app.config(require('./routes')); //Configure the routes

app.config(function ($httpProvider) { //Configure the auth interceptor
  $httpProvider.interceptors.push('loaderInterceptor');
  $httpProvider.interceptors.push('authInterceptor');
});