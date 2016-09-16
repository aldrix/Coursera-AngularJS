(function () {
'use strict';

angular.module('LunchCheckerApp', [])
.controller('LunchCheckerController', LCController);

LCController.$inject = ['$scope'];
function LCController ($scope) {
  $scope.listOfThings = "";
  $scope.customTextBoxStyle = {};
  $scope.customMessageStyle = {};

  $scope.showMessage = function () {

    var arrayOfThings = splitString($scope.listOfThings,',')
    var wordsNumber = wordsCounter(arrayOfThings);

    var sum = 0;
    for (var i = 0; i < arrayOfThings.length; i++) {
      if (arrayOfThings[i] == "" || arrayOfThings[i] == " ") {
        sum += 1;
      }
    }

    wordsNumber -= sum;

    if (wordsNumber > 0 && wordsNumber <= 3) {
      $scope.message = "Enjoy!";
      $scope.customMessageStyle.style = {"color":"green"};
      $scope.customTextBoxStyle.style = {"borderColor":"green"};
    } else if (wordsNumber > 3) {
      $scope.message = "Too much!";
      $scope.customMessageStyle.style = {"color":"green"};
      $scope.customTextBoxStyle.style = {"borderColor":"green"};
    } else if (wordsNumber == 0) {
      $scope.message = "Please enter data first!";
      $scope.customMessageStyle.style = {"color":"red"};
      $scope.customTextBoxStyle.style = {"borderColor":"red"};
    }
  }

  function splitString (string, separator) {
    var arrayOfStrings = string.split(separator);

    return arrayOfStrings;
  }

  function wordsCounter (array) {

    return array.length;
  }

}

})();
