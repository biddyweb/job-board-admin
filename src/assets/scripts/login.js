var ko = window.ko = require('knockout');
var $ = window.$ = require('jquery');
var auth = require('./auth')($);

var ViewModel = function() {
  var self = this;

  self.email = ko.observable();
  self.password = ko.observable();
  self.currentUser = ko.observable();
  self.loginError = ko.observable();

  if(auth.isAuthenticated()) {
    self.currentUser(auth.currentUser());
  }

  self.logout = function() {
    auth.logout(function() {
      self.currentUser(null);
    });
  };

  self.authenticate = function() {
    auth.authenticate(self.email(), self.password(), function(err, user) {
      if(err) {
        self.loginError(err);
      } else {
        window.location.href="/jobs.html";
      }
    });
  };
};

var viewModel = window.viewModel = new ViewModel();
ko.applyBindings(viewModel);
