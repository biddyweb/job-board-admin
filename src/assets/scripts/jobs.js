var ko = window.ko = require('knockout');
var $ = window.$ = require('jquery');
var auth = require('./auth')($);
var service = require('./service')(auth.currentUser().token, $);
var marked = require('marked');

var ViewModel = function() {
  var self = this;
  var currentJobPreviousState = null;

  self.jobs = ko.observableArray();
  self.job = ko.observable(null);

  self.truncate = function(text) {
    if(text.length > 100) {
      text = text.substring(0,99) + "...";
    }
    return text;
  };

  self.makeHtml = function(text) {
    return marked(text);
  };

  self.newJob = function() {
    var job = {title: ko.observable(""), body: ko.observable("")};
    self.job(job);
  };

  self.saveJob = function() {
    var isNew = self.job()._id === undefined;
    service.saveJob(self.job(), function(job) {
      self.job(null);
      if(isNew) self.jobs.push(makeJobObservable(job));
    });
  };

  self.deleteJob = function() {
    service.deleteJob(self.job()._id, function() {
      self.jobs.remove(self.job());
      self.job(null);
    })
  };

  self.cancelJobEdit = function() {
    self.job().title(self.currentJobPreviousState.title);
    self.job().body(self.currentJobPreviousState.body);
    self.job(null);
  };

  self.job.subscribe(function(job) {
    if(job == null) {
      self.currentJobPreviousState = null;
    } else {
      self.currentJobPreviousState = makeJobJson(job);
    }
  }, null, "change");

  var makeJobObservable = function(job) {
    job.title = ko.observable(job.title);
    job.body = ko.observable(job.body);
    return job;
  };

  var makeJobJson = function(job) {
    var newJob = $.extend({}, job);
    newJob.title = job.title();
    newJob.body = job.body();
    return newJob;
  };

  if(!auth.isAuthenticated()) {
    location.href = '/login.html';
    return;
  }

  service.myJobs(function(jobs) {
    self.jobs($.map(jobs, function(job) {
      return makeJobObservable(job);
    }));
  });

};

var viewModel = window.viewModel = new ViewModel();
ko.applyBindings(viewModel);
