module.exports = function($) {
  var cargo = require('cargo');
  var SERVICE_URL = 'http://localhost:3000';

  return {
    isAuthenticated: function() {
      return cargo.session('currentUser') !== undefined;
    }
    , currentUser: function() {
      if(this.isAuthenticated() && arguments && arguments.length > 0) this.currentUser(arguments[0]);
      else return this.isAuthenticated() ? JSON.parse(cargo.session('currentUser')) : false;
    }
    , authenticate: function(email, password, cb) {
      $.post(SERVICE_URL + '/auth/authenticate', { email: email, password: password })
        .success(function(user){
          cargo.session('currentUser', JSON.stringify(user));
          cb(null, user);
        })
        .error(function(error){
          cb(error, null);
        });
    }
    , logout: function(cb) {
      cargo.session('currentUser', null);
      cb();
    }
    , register: function(userData, cb) {
      $.post(SERVICE_URL + '/auth/register', userData)
        .success(function(user) {
          cargo.session('currentUser', JSON.stringify(user));
          cb(null, user);
        })
        .error(function(err) {
          cb(err, null);
        });
    }
  };

}
