'use strict'

const
  gulp = require('gulp'),
  path = require('path'),
  utils = require('../utils'),
  del = require('del'),
  gulpconf = require('./gulpconf')


gulp.task('build', ['clean'], function () {
  return gulp.start('browserify')
})

gulp.task('browserify', ['ng-app:modules'], gulpconf.bundler)

gulp.task('clean', cleanup)

function cleanup() {
  return del.sync([utils.paths.dist, utils.paths.tmp, path.join(utils.paths.client, 'app/index.*.js')])
}
