'use strict'

/* jshint -W098 */

/* @ngInject */
exports.SidenavController = function ($scope, $mdSidenav) {
  $scope.sidenav = this

  this.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle()
  }

  this.lala = "lalallll"
  this.things = ['oneesd', 'two', 'three']

}

/* @ngInject */
exports.ToolbarController = function ($scope, $log, $mdSidenav, $rootScope) {
  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle()
  }
}
