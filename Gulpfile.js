var gulp      = require('gulp'),
  gutil       = require('gulp-util'),
  jade        = require('gulp-jade'),
  browserify  = require('gulp-browserify'),
  stylus      = require('gulp-stylus'),
  livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
  tinylr      = require('tiny-lr'),
  express     = require('express'),
  app         = express(),
  path        = require('path'),
  server      = tinylr(),
  config      = require('./config')()[process.env.NODE_ENV],
  replace     = require('gulp-replace'),
  rimraf      = require('gulp-rimraf'),
  sftp        = require('gulp-sftp'),
  runSequence = require('run-sequence');

/*
* Cleans the dist folder
*/
gulp.task('clean', function () {
  return gulp.src('dist/', { read: false }).
    pipe(rimraf({ force: true }));
});

/*
* Copies the contents on dist folder to the specified server
*/
gulp.task('sftp', function () {
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
* Parses styl templates
*/
gulp.task('stylus', function () {
  gulp.src('src/*.styl').
    pipe(stylus()).
    pipe(gulp.dest('dist/')).
    pipe(livereload(server));
});

/*
* Browserify's app.js file
*/
gulp.task('browserify', function () {
  return gulp.src('src/app.js').
    pipe(replace(/\{serviceUrl\}/g, config.serviceUrl)).
    pipe(browserify({ debug : process.env.NODE_ENV == 'development' })).
    pipe(gulp.dest('dist/')).
    pipe(livereload(server));
});

/*
* Parses the index.jade and generates dist/index.html
*/
gulp.task('templates', function () {
  return gulp.src('src/index.jade').
    pipe(jade({ pretty: true })).
    pipe(gulp.dest('dist/')).
    pipe(livereload(server));
});

/*
* Copies src/views to dist/views
*/
gulp.task('angular-views', function () {
  return gulp.src('src/views/**/*.html').
    pipe(gulp.dest('dist/views/') ).
    pipe(livereload(server));
});

/*
* Copies src/*.txt to dist. This is useful for robots.txt and humans.txt
*/
gulp.task('text-files', function () {
  return gulp.src('src/*.txt').
    pipe(gulp.dest('dist/') ).
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
    gulp.watch('src/*.styl',['stylus']);
    gulp.watch('src/views/**/*.html',['angular-views']);

  });
});

gulp.task('build', function () {
  runSequence('clean', 'browserify', ['angular-views', 'templates', 'stylus', 'text-files']);
});

gulp.task('deploy', function () {
  runSequence('clean', 'browserify', ['angular-views', 'templates', 'stylus', 'text-files'], 'sftp');
})

gulp.task('default', ['browserify', 'templates', 'angular-views', 'text-files', 'stylus', 'express', 'watch']);
