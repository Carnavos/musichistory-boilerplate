'use strict';

let sass = require('gulp-sass');
let watchify = require('watchify');
let browserify = require('browserify');
let gulp = require('gulp');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let gutil = require('gulp-util');
let sourcemaps = require('gulp-sourcemaps');
let assign = require('lodash.assign');
let jshint = require('gulp-jshint');
let watch = require('gulp-watch');


// add custom browserify options here
let customOpts = {
  // Should be one file, starting point for browserify (which has required modules declared)
  // Note this is not the file to be loaded into HTML script (in this instance dist/bundle.js)
  entries: ['./javascripts/main.js'],
  debug: true
};
let opts = assign({}, watchify.args, customOpts);
let b = watchify(browserify(opts)); 

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('default', ['lint', 'watch', 'sassify'], bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

gulp.task('watch', function() {
  gulp.watch('./javascripts/**/*.js', ['lint']);
  gulp.watch('./sass/**/*.scss', ['sassify']);
});


gulp.task('lint', function() {
  return gulp.src('./javascripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Joe's sample sass gulp task, chained to watch/lint above
gulp.task('sassify', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});