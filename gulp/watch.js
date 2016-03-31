'use strict'

const
  gulp = require('gulp'),
  path = require('path'),
  utils = require('../utils'),
  del = require('del'),
  watch = require('gulp-watch'),
  gulpconf = require('./gulpconf'),
  gutil = require('gulp-util')

gulp.task('watch', ['watch1'], function () {
  watch(path.join(utils.paths.client, '/app/components/**'), function () {
    gulp.start('watch1')
  })
})

gulp.task('watch2', ['wclean'], function () {
  return gulp.start('ng-app:modules')
})

gulp.task('watch1', ['watch2'], gulpconf.bundlerWatcher)

gulpconf.__bundlerWatcher.on('log', gutil.log)

gulp.task('wclean', wcleanup)

function wcleanup() {
  return del([path.join(utils.paths.client, 'app', 'index.*.js')])
}
