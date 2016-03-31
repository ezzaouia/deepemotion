'use strict'

const
  gulp = require('gulp'),
  path = require('path'),
  utils = require('../utils'),
  fs = require('fs'),
  glob = require('glob')


// paths
let ngControllersPath = path.join(utils.paths.client, 'app', 'index.controllers.js')
let ngServicesPath = path.join(utils.paths.client, 'app', 'index.services.js')
let ngDirectivesPath = path.join(utils.paths.client, 'app', 'index.directives.js')

// ng module files
let ngControllers = glob.sync(path.join(utils.paths.client, 'app', '/**/*.controllers.js'), {
  ignore: path.join(utils.paths.client, 'app/*.js')
})
let ngServices = glob.sync(path.join(utils.paths.client, 'app', '/**/*.services.js'), {
  ignore: path.join(utils.paths.client, 'app/*.js')
})
let ngDirectives = glob.sync(path.join(utils.paths.client, 'app', '/**/*.directives.js'), {
  ignore: path.join(utils.paths.client, 'app/*.js')
})


gulp.task('ng-app:modules', function () {

  fs.writeFileSync(ngControllersPath, '\'use strict\'\n', 'utf8')
  fs.writeFileSync(ngServicesPath, '\'use strict\'\n', 'utf8')
  fs.writeFileSync(ngDirectivesPath, '\'use strict\'\n', 'utf8')

  ngControllers.map(function (file) {
    writeItem(ngControllersPath, file, 'Controllers')
  })

  ngServices.map(function (file) {
    writeItem(ngServicesPath, file, 'Services')
  })

  ngDirectives.map(function (file) {
    writeItem(ngDirectivesPath, file, 'Directives')
  })
});


function writeItem(filename, file, modulename) {
  let afilename = file.split('/')
  let name = afilename[afilename.length - 1].split('.')[0]
  afilename.shift()
  afilename.shift()
  let relativepath = './' + afilename.join('/')
  let line = 'exports.' + name + modulename + ' = ' + ' require(\'' + relativepath + '\')\n'

  fs.appendFileSync(filename, line);
}
