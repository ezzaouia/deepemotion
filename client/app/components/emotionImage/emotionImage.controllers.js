'use strict'
export class EmotionImageController {
  constructor($scope) {
    'ngInject'
    $scope.$watch('files.length', function () {
      console.log($scope.files)
    })
  }
}
