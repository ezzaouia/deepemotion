'use strict'

const
  gulp = require('gulp'),
  path = require('path'),
  utils = require('../utils'),

  browserify = require('browserify'),
  watchify = require('watchify'),

  gsourcemaps = require('gulp-sourcemaps'),
  guglify = require('gulp-uglify'),
  ngAnnotate = require('gulp-ng-annotate'),

  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),

  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,

  _ = require('underscore')

let customOpts = {
  entries: [path.join(utils.paths.client, '/', 'index.js')],
  debug: true
}

let opts = _.extendOwn({}, watchify.args, customOpts)

let __bundler = browserify(customOpts)
let __bundlerWatcher = watchify(browserify(opts))

// A bit of exports
// ----------------
exports.__bundler = __bundler
exports.__bundlerWatcher = __bundlerWatcher
exports.browserSync = browserSync
exports.reload = reload

exports.bundler = function () {
  return __bundler.transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .on('error', function (err) {
      utils.errorHandler('bunbler')(err)
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(utils.paths.tmp))
    .pipe(buffer())
    .pipe(gsourcemaps.init({
      loadMaps: true
    }))
    .pipe(ngAnnotate())
    .pipe(guglify())
    .pipe(gsourcemaps.write('./'))
    .pipe(gulp.dest(utils.paths.dist))
}

exports.bundlerWatcher = function () {
  return __bundlerWatcher.transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .on('error', function (err) {
      utils.errorHandler('bunbler')(err)
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(utils.paths.tmp))
    .pipe(buffer())
    .pipe(gsourcemaps.init({
      loadMaps: true
    }))
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(guglify())
    .pipe(gsourcemaps.write('./'))
    .pipe(gulp.dest(utils.paths.dist))
    .pipe(browserSync.stream())
}
