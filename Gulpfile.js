var gulp      = require('gulp'),
  gutil       = require('gulp-util'),
  jade        = require('gulp-jade'),
  browserify  = require('gulp-browserify'),
  livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
  tinylr      = require('tiny-lr'),
  express     = require('express'),
  app         = express(),
  path        = require('path'),
  server      = tinylr(),
  config      = require('./config')()[process.env.NODE_ENV],
  replace     = require('gulp-replace'),
  rimraf      = require('gulp-rimraf'),
  sftp        = require('gulp-sftp');

/*
* Cleans the dist folder
*/
gulp.task('clean', function () {
  return gulp.src('dist/**/*', { read: false }).
    pipe(rimraf({ force: true }));
});

/*
* Copies the contents on dist folder to the specified server
*/
gulp.task('deploy', ['clean', 'browserify', 'templates', 'angular-views'], function () {
  return gulp.src('dist/**/*').
    pipe(sftp({
          host: config.deploy.host,
          user: config.deploy.user,
          pass: config.deploy.pass,
          port: config.deploy.port,
          remotePath: config.deploy.remotePath
        }));
});

/*
* Browserify's app.js file
*/
gulp.task('browserify', ['clean'], function () {
  return gulp.src('src/app.js').
    pipe(replace(/\{serviceUrl\}/g, config.serviceUrl)).
    pipe(browserify({ debug : true })).
    pipe(gulp.dest('dist/')).
    pipe(livereload(server));
});

/*
* Parses the index.jade and generates dist/index.html
*/
gulp.task('templates', ['clean'], function () {
  return gulp.src('src/index.jade').
    pipe(jade({ pretty: true })).
    pipe(gulp.dest('dist/')).
    pipe(livereload(server));
});

/*
* Copies src/views to dist/views
*/
gulp.task('angular-views', ['clean'], function () {
  return gulp.src('src/views/**/*.html').
    pipe(gulp.dest('dist/views/') ).
    pipe(livereload(server));
});

/*
* Dev server
*/
gulp.task('express', function () {
  app.use(express.static(path.resolve('dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});

/*
* Re-executes tasks if any file changes
*/
gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) return console.log(err);

    gulp.watch('src/**/*.js',['browserify']);
    gulp.watch('src/*.jade',['templates']);
    gulp.watch('src/views/**/*.html',['angular-views']);

  });
});

gulp.task('build', ['clean', 'browserify', 'templates', 'angular-views']);
gulp.task('default', ['browserify', 'templates', 'angular-views', 'express', 'watch']);
