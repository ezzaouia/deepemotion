'use strict'

/* @ngInject */
/* jshint -W098 */
exports.SidebarController = function () {}

/* @ngInject */
exports.ToolbarController = function ($scope, $mdSidenav, $rootScope) {
  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle()
  }
}
