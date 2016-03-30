'use strict'

const
  gulp = require('gulp'),
  utils = require('../utils'),
  del = require('del'),
  gulpconf = require('./gulpconf')


gulp.task('browserify', gulpconf.bundler)

gulp.task('build', ['clean', 'browserify'])

gulp.task('clean', cleanup)

function cleanup() {
  return del([utils.paths.dist, utils.paths.tmp])
}
