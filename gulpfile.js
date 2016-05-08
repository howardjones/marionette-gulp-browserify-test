// All this started from https://blog.engineyard.com/2015/client-side-javascript-project-gulp-and-browserify
// because it's a big confusing mess


// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();


// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');

// HTML dependencies

var htmlmin = require('gulp-htmlmin');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');



gulp.task('lint-client', function() {
  return gulp.src('./client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', function() {
  return gulp.src('./test/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});



gulp.task('browserify-client', ['lint-client'], function() {
  return gulp.src('client/index.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('car-finder.js'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/javascripts'))
    .on('change', browserSync.reload); 
});

gulp.task('browserify-test', ['lint-test'], function() {
  return gulp.src('test/client/index.js')
    .pipe(browserify({insertGlobals: true}))
    .pipe(rename('client-test.js'))
    .pipe(gulp.dest('build'));
});


gulp.task('test', ['lint-test', 'browserify-test'], function() {
  return gulp.src('test/client/index.html')
    .pipe(mochaPhantomjs());
});




gulp.task('styles', function() {
  return gulp.src('client/less/index.less')
//    .pipe(plumber())
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('car-finder.css'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('build/car-finder.css')
    .pipe(minifyCSS())
    .pipe(rename('car-finder.min.css'))
    .pipe(gulp.dest('public/stylesheets'))
    .on('change', browserSync.reload); 
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('build/car-finder.js')
    .pipe(uglify())
    .pipe(rename('car-finder.min.js'))
    .pipe(gulp.dest('public/javascripts'))
    .on('change', browserSync.reload); ;
});

gulp.task('build', ['uglify', 'minify']);

gulp.task('watch', function() {
  browserSync.init({server:'./public/'});
  gulp.watch('client/**/*.js', ['browserify-client', 'test']);
  gulp.watch('test/client/**/*.js', ['test']);
  gulp.watch('client/**/*.less', ['minify']);

});


gulp.task('default', ['test', 'build', 'watch']);
