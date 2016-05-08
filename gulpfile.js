// All this started from https://blog.engineyard.com/2015/client-side-javascript-project-gulp-and-browserify
// because it's a big confusing mess


// Gulp Dependencies
var gulp = require('gulp');
var debug = require('gulp-debug');
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


gulp.task('lint-client', function () {
    return gulp.src('./client/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', function () {
    return gulp.src('./test/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('browserify-client', ['lint-client'], function () {
    return gulp.src('client/index.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('test-project.js'))
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('browserify-test', ['lint-test'], function () {
    return gulp.src('test/client/index.js')
        .pipe(browserify({insertGlobals: true}))
        .pipe(rename('client-test.js'))
        .pipe(gulp.dest('build'));
});


gulp.task('test', ['lint-test', 'browserify-test'], function () {
    return gulp.src('test/client/index.html')
        .pipe(mochaPhantomjs());
});


gulp.task('styles', function () {
    return gulp.src('client/less/index.less')
        //    .pipe(plumber())
        .pipe(less())
        .pipe(prefix({cascade: true}))
        .pipe(rename('test-project.css'))
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('minify', ['styles'], function () {
    return gulp.src('build/test-project.css')
        .pipe(minifyCSS())
        .pipe(rename('test-project.min.css'))
        .pipe(gulp.dest('public/stylesheets'))
        .on('change', browserSync.reload);
});

gulp.task('uglify', ['browserify-client'], function () {
    return gulp.src('build/test-project.js')
        .pipe(uglify())
        .pipe(rename('test-project.min.js'))
        .pipe(gulp.dest('public/javascripts'))
        .on('change', browserSync.reload);
    ;
});

gulp.task('build', ['uglify', 'minify']);

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });
});

gulp.task('html', function () {
    browserSync.reload();
});

gulp.task('watch', ['serve'], function () {
    // browserSync.init({server:'./public/'});
    gulp.watch('client/**/*.js', ['browserify-client', 'test', browserSync.reload]);
    gulp.watch('test/client/**/*.js', ['test', browserSync.reload]);
    gulp.watch('client/**/*.less', ['minify'], browserSync.reload);
    gulp.watch('./public/*.html', ['html', browserSync.reload]);


});

gulp.task('default', ['test', 'build', 'watch']);
