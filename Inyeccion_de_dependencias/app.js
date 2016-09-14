(function () {
'use strict';

angular.module('IDAplicacion', [])
.controller('IDControlador', IDControlador);

IDControlador.$inject = ['$scope','$filter'];
function IDControlador ($scope, $filter) {
  $scope.nombre = "Aldrix";

  $scope.mayuscula = function () {
    var enMayuscula = $filter('uppercase');
    $scope.nombre = enMayuscula($scope.nombre);
  };
}

})();


//Version minificada que permite tener archivos menos pesados y que se descargen mas rapido los archivos.
//!function(){"use strict";function n(n,o){n.nombre="Aldrix",n.mayuscula=function(){var r=o("uppercase");n.nombre=r(n.nombre)}}angular.module("IDAplicacion",[]).controller("IDControlador",n),n.$inject=["$scope","$filter"]}();