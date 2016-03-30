'use strict'

const
  glob = require('glob'),
  path = require('path'),
  utils = require('../utils'),
  _ = require('underscore')

/* jshint -W117*/
let components = angular.module(utils.constants.appnamecomp, ['ng'])

glob.sync('./app/components/**/*.controllers.js').forEach(function (file) {
  _.each(require(path.resolve(file)), function (controller, name) {
    components.controller(name, controller)
  })
})

glob.sync('./app/components/**/*.services.js').forEach(function (file) {
  _.each(require(path.resolve(file)), function (service, name) {
    components.factory(name, service)
  })
})

glob.sync('./app/components/**/*.directives.js').forEach(function (file) {
  _.each(require(path.resolve(file)), function (directive, name) {
    components.directive(name, directive)
  })
})

let app = angular.module(utils.constants.appname, [utils.constants.appnamecomp])

app.config(function () {})
