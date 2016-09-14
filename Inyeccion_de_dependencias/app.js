(function () {
'use strict';

angular.module('IDAplicacion', [])
.controller('IDControlador', IDControlador);

function IDControlador ($scope,
                       $filter,
                       $injector) {
  $scope.nombre = "Aldrix";

  $scope.mayuscula = function () {
    var enMayuscula = $filter('uppercase');
    $scope.nombre = enMayuscula($scope.nombre);
  };
}

})();
