var ko = window.ko = require('knockout');
var $ = window.$ = require('jquery');
var auth = require('./auth')($);
if(!auth.isAuthenticated()) {
  location.href = '/login.html';
  return;
}
var service = require('./service')(auth.currentUser().token, $);

var ViewModel = function() {
  var self = this;

  var user = auth.currentUser();
  user.password = "";
  user.passwordConfirmation = "";

  self.user = ko.observable(user);
  self.notice = ko.observable(false);

  self.saveUser = function() {
    if(!passwordsMatch()) {
      self.notice({ type: "danger", text: "The passwords don't match" });
    } else {
      self.notice(false);
      service.saveUser(self.user(), function() {
        self.notice({ type: "success", text: "Your data was succesfully saved!" });
        var user = self.user();
        user["password"] = null;
        user["passwordConfirmation"] = null;
        auth.currentUser(user);
      });
    }
  };

  var passwordsMatch = function() {
    if(self.user().password == "" && self.user().passwordConfirmation == "") return true;
    else return self.user().password == self.user().passwordConfirmation;
  };

};

var viewModel = window.viewModel = new ViewModel();
ko.applyBindings(viewModel);
