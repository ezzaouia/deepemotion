'use strict'

/* jshint -W098 */
export class SidenavController {

  constructor($mdSidenav, $mdDialog) {
    'ngInject'

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

      let alert = $mdDialog.alert({
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
}

export class ToolbarController {
  constructor($mdSidenav) {
    'ngInject'
    this.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle()
    }
  }
}
