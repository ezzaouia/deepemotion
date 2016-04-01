'use strict'

const
  gulp = require('gulp'),
  path = require('path'),
  utils = require('../utils'),
  gulpconf = require('./gulpconf')

gulp.task('serve', ['watch'], function () {
  gulpconf.browserSync.init({
    server: utils.paths.client,
    logFileChanges: false
  })

  gulp.watch(path.join(utils.paths.client, '/**/*.html')).on('change', gulpconf.reload)
  gulp.watch(path.join(utils.paths.client, '/**/*.css')).on('change', gulpconf.reload)
})
