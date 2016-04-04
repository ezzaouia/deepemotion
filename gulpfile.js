/**
 * Main file for Gulp
 */
'use strict'

const
  gulp = require('gulp'),
  utils = require('./utils'),
  wrench = require('wrench'),
  del = require('del')

try {
  wrench.readdirSyncRecursive('./gulp/').filter(function (file) {
    return (/(\.js)$/i).test(file) && !(/(gulpconf.js)/i).test(file)
  }).map(function (file) {
    require('./gulp/' + file)
  })
} catch (err) {
  return utils.errorHandler('wrench.readdirSyncRecursive', err)
}

gulp.task('default', ['build'])


gulp.task('cleanupload', function () {
  return del.sync(['backend/tmp/*'])
})
