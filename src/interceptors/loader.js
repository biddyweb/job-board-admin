module.exports = function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      $rootScope.requestInProgress = true;
      return config;
    },
    response: function (response) {
      $rootScope.requestInProgress = false;
      return response;
    }
  };
};