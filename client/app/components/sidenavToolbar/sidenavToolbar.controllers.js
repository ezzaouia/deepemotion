'use strict'

/* jshint -W098 */

/* @ngInject */
exports.SidenavController = function ($scope, $mdSidenav, $mdDialog) {
  $scope.sidenav = this

  this.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle()
  }

  this.selected = null
  this.selectItem = function (item, menuId) {
    this.selected = item

    // get the sidenav
    let sidenav = $mdSidenav(menuId)
    if (sidenav.isOpen()) { // check if it is open & close it of so
      sidenav.close()
    }

    alert = $mdDialog.alert({
      title: 'Attention',
      textContent: 'This is an example of how easy dialogs can be!',
      ok: 'Close'
    });
    $mdDialog
      .show(alert)
      .finally(function () {
        alert = undefined;
      });
  }

  this.title = 'Face Emotion Recognition'
  this.items = ['Image Api', 'Video Api']

}

/* @ngInject */
exports.ToolbarController = function ($scope, $log, $mdSidenav, $rootScope) {
  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle()
  }
}
