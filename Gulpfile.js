var gulp = require('gulp'),
  connect = require('gulp-connect'),
  g = require('gulp-load-plugins')({lazy: false}),
  noop = g.util.noop,
  es = require('event-stream'),
  bowerFiles = require('main-bower-files'),
  rimraf = require('rimraf'),
  queue = require('streamqueue'),
  lazypipe = require('lazypipe'),
  stylish = require('jshint-stylish'),
  isWatching = false;

gulp.task('connect', function() {
  connect.server({
    root: './',
    port : '3000',
    livereload: true
  });
});

gulp.task('coffee', function () {
  return gulp.src([
    './js/*.coffee'
  ])
    .pipe(g.coffee())
    .pipe(gulp.dest('dist/'));
});

gulp.task('reload', ['coffee'], function () {
  gulp.src(['./**/*.html'])
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./**/*.html','./**/*.{js,coffee}', 'css/main.css'], ['reload']);
});

gulp.task('serve', ['connect', 'watch']);
