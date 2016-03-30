/**
 *  Project configuration file
 */
'use strict'
const
  colors = require('colors/safe')

exports.paths = {
  client: 'client', // high level code
  tmp: 'client/tmp', // compiled code
  dist: 'client/dist', // optimized code for production
  backend: 'backend'
}

exports.constants = {
  appname: 'ngNodeGulpSeed',
  appnamecomp: 'ngNodeGulpSeedComp'
}

exports.errorHandler = function (title) {
  return function (err) {
    console.log(colors.red('[' + title + ']'), err.toString())
  }
}
