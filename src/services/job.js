module.exports = function ($http, $q) {

  var SERVICE_URL = 'http://localhost:3000';

  var all = function () {
    var deferred = $q.defer();

    $http
      .get(SERVICE_URL + '/admin/jobs')
      .success(function (data) {
        deferred.resolve(data);
      })
      .error(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  var findOne = function (id) {
    var deferred = $q.defer();

    $http
      .get(SERVICE_URL + '/jobs/' + id)
      .success(function (data) {
        delete data.user;
        deferred.resolve(data);
      })
      .error(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  var save = function (job) {
    if(job._id) return update(job);
    else return create(job);
  };

  var update = function (job) {
    var deferred = $q.defer();

    $http
      .put(SERVICE_URL + '/admin/jobs/' + job._id, job)
      .success(function (message) {
        deferred.resolve([{message: 'The job was succesfully updated'}, job]);
      }) 
      .error(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  var create = function (job) {
    var deferred = $q.defer();

    $http
      .post(SERVICE_URL + '/admin/jobs', job)
      .success(function (data) {
        deferred.resolve([{message: 'The job was succesfully created'}, data]);
      }) 
      .error(function (error) {
        deferred.reject(error);
      });
      
    return deferred.promise;
  };

  var remove = function (jobId) {
    var deferred = $q.defer();

    $http
      .delete(SERVICE_URL + '/admin/jobs/' + jobId)
      .success(function (data) {
        deferred.resolve([{message: 'The job was succesfully deleted'}, data]);
      }) 
      .error(function (error) {
        deferred.reject(error);
      });
      
    return deferred.promise;
    
  };

  return {
    all: all,
    findOne: findOne,
    save: save,
    remove: remove
  };

};