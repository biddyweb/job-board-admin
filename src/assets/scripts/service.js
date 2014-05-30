module.exports = function(token, $) {
  var SERVICE_URL = 'http://localhost:3000';
  return {
    myJobs: function(cb) {
      $.ajax(SERVICE_URL + '/admin/jobs',
          { type: "GET", headers: { Authorization: "Bearer " + token } })
        .done(cb);
    },
    saveJob: function(job, cb) {
      var method = "POST";
      var resourceUrl = "/admin/jobs";

      var jobData = {
        title: job.title()
        , body: job.body()
      };

      if(job._id) {
          method = "PUT";
          resourceUrl = resourceUrl + "/" + job._id;
      }

      $.ajax(SERVICE_URL + resourceUrl,
          { type: method
            , headers: { Authorization: "Bearer " + token }
            , data: jobData } )
        .done(cb);
    },
    getJob: function(id, cb) {
      $.ajax(SERVICE_URL + '/jobs/' + id,
          { type: "GET", headers: { Authorization: "Bearer " + token } })
        .done(cb);
    },
    deleteJob: function(id, cb) {
      $.ajax(SERVICE_URL + '/admin/jobs/' + id,
          { type: "DELETE",
          headers: { Authorization: "Bearer " + token }
        } )
        .done(cb);
    },
    saveUser: function(user, cb) {
      var userData = { username: user.username
          , email: user.email
          , companyName: user.companyName
          , companyBio: user.companyBio };
      if(user.password) userData.password = user.password;

      $.ajax(SERVICE_URL + "/admin/users/" + user._id,
          { type: "PUT"
            , headers: { Authorization: "Bearer " + token }
            , data: userData } )
        .done(cb);
    }
  };
};
