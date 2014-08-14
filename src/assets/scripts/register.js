var ko = window.ko = require('knockout');
var $ = window.$ = require('jquery');
var auth = require('./auth')($);

var ViewModel = function() {
  var self = this;

  self.email = ko.observable();
  self.companyBio = ko.observable();
  self.companyName = ko.observable();
  self.password = ko.observable();
  self.username = ko.observable();
  self.currentUser = ko.observable();
  self.name = ko.observable();
  self.registerError = ko.observable();

  if(auth.isAuthenticated()) {
    self.currentUser(auth.currentUser());
  }

  self.logout = function() {
    auth.logout(function() {
      self.currentUser(null);
    });
  };

  self.register = function() {
    var userData = { email: self.email()
      , password: self.password()
      , companyBio: self.companyBio()
      , companyName: self.companyName()
      , username: self.username()
      , name: self.name() };
    auth.register(userData, function (err, user) {
      if(err) {
        self.registerError(err);
      } else {
        window.location.href="/login.html";
      }
    });
  };
};

var viewModel = window.viewModel = new ViewModel();
ko.applyBindings(viewModel);
