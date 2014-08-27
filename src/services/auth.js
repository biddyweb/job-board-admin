module.exports = function ($http, $window, $q) {

  var SERVICE_URL = 'http://localhost:3000';
  
  var login = function (username, password) {
    var deferred = $q.defer();
    var data = { email: username, password: password };

    $http
      .post(SERVICE_URL + '/auth/authenticate', data)
      .success(function (user) {
        $window.sessionStorage.currentUser = JSON.stringify(user);
        $window.sessionStorage.token = user.token;
        deferred.resolve(currentUser());
      })
      .error(function (error){
        deferred.reject(error);
      });
    
    return deferred.promise;
  };

  //I'm using promises just in case tomorrow there is a method to
  //call on the server, this way I don't need to re implement the controllers
  //calling this service method, instead I use the same promise and 
  //change the implementation.
  var logout = function () {
    var deferred = $q.defer();

    setTimeout(function () {
      delete $window.sessionStorage.currentUser;
      delete $window.sessionStorage.token;
      deferred.resolve({message: 'The user has been logged out succesufully'});
    });

    return deferred.promise;
  };

  var isAuthenticated = function () {
    return $window.sessionStorage['currentUser'];
  };

  var currentUser = function () {
    if(isAuthenticated()) {
      return JSON.parse($window.sessionStorage['currentUser']);
    } else {
      return null;
    }
  }

  var register = function (user) {
    var deferred = $q.defer();

    $http
      .post(SERVICE_URL + '/auth/register', user)
      .success(function (user) {
        $window.sessionStorage.currentUser = JSON.stringify(user);
        $window.sessionStorage.token = user.token;
        deferred.resolve([$window.sessionStorage.currentUser]);
      })
      .error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;  
  };

  return {
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated,
    currentUser: currentUser,
    register: register
  };

};