'use strict'

const
  gulp = require('gulp'),
  gulpconf = require('./gulpconf'),
  gutil = require('gulp-util')

gulp.task('watch', ['ng-app:modules'], gulpconf.bundlerWatcher)
gulpconf.__bundlerWatcher.on('update', gulpconf.bundlerWatcher)
gulpconf.__bundlerWatcher.on('log', gutil.log)
