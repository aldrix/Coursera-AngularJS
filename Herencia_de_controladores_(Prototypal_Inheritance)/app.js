(function () {
'use strict';

angular.module('ControladorHerenciaAplicacion', [])
.controller('ControladorPadre1', ControladorPadre1)
.controller('ControladorHijo1',ControladorHijo1)
.controller('ControladorPadre2',ControladorPadre2)
.controller('ControladorHijo2',ControladorHijo2);

ControladorPadre1.$inject = ['$scope'];
function ControladorPadre1($scope) {
  $scope.valorPadre = 1;
  $scope.cp = this;
  $scope.cp.valorPadre = 1;
}

ControladorHijo1.$inject = ['$scope'];
function ControladorHijo1($scope) {
  // console.log('$scope.valorPadre: ',$scope.valorPadre);
  // console.log('HIJO $scope: ', $scope);

  // $scope.valorPadre = 5;
  // console.log('*** CAMBIADO: $scope.valorPadre = 5 ***');
  // console.log('$scope.valorPadre: ', $scope.valorPadre);
  // console.log($scope);

  // console.log('$scope.cp.valorPadre: ', $scope.cp.valorPadre);
  // $scope.cp.valorPadre = 5;
  // console.log('*** CAMBIADO: $scope.cp.valorPadre = 5 ***');
  // console.log('$scope.cp.valorPadre: ', '$scope.$parent.valorPadre');
}

// **Controlador como sintaxis
function ControladorPadre2() {
  var padre = this;
  padre.valor = 1;
}

ControladorHijo2.$inject = ['$scope'];
function ControladorHijo2($scope) {
  var hijo = this;
  hijo.valor = 5;
  console.log('ControladorHijo2 $scope', $scope);
}

})();