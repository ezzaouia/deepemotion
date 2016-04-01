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
  appname: 'deepEmotion',
  appnamecomp: 'deepEmotionComp'
}

exports.errorHandler = function (title, err) {
  console.log(colors.magenta.bold('[' + title + ']'), colors.red.bold(err.toString()))
}
