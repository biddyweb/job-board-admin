var gulp      = require('gulp'),
  gutil       = require('gulp-util'),
  styl        = require('gulp-styl'),
  csso        = require('gulp-csso'),
  jade        = require('gulp-jade'),
  browserify  = require('gulp-browserify'),
  livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
  tinylr      = require('tiny-lr'),
  express     = require('express'),
  app         = express(),
  path        = require('path'),
  server      = tinylr();


// --- Basic Tasks ---
/*gulp.task('css', function() {
  return gulp.src('src/assets/stylesheets/*.styl').
    pipe( styl( { whitespace: true } ) ).
    pipe( csso() ).
    pipe( gulp.dest('dist/assets/stylesheets/') ).
    pipe( livereload( server ));
});*/

gulp.task('browserify', function() {
  return gulp.src('src/app.js').
    pipe( browserify( {debug : true}) ).
    pipe( gulp.dest('dist/')).
    pipe( livereload( server ));
});

gulp.task('templates', function() {
  return gulp.src('src/index.jade').
    pipe(jade({
      pretty: true
    })).
    pipe(gulp.dest('dist/')).
    pipe( livereload( server ));
});

gulp.task('angular-views', function() {
  return gulp.src('src/views/**/*.html').
    pipe(gulp.dest('dist/views/')).
    pipe( livereload( server ));
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});

gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) return console.log(err);

    //gulp.watch('src/assets/stylesheets/*.styl',['css']);
    gulp.watch('src/**/*.js',['browserify']);
    gulp.watch('src/*.jade',['templates']);
    gulp.watch('src/views/**/*.html',['angular-views']);

  });
});

// Default Task
gulp.task('default', ['browserify', 'templates', 'angular-views', 'express', 'watch']);
