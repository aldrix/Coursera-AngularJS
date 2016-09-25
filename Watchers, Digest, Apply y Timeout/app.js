(function () {
'use strict';

angular.module('ContadorAplicacion', [])
.controller('ContadorControlador', ContadorControlador);

ContadorControlador.$inject = ['$scope', '$timeout'];
function ContadorControlador($scope, $timeout) {
  $scope.unaVezContador = 0;
  $scope.contador = 0;
  $scope.retrasoContador = 0;
  $scope.nombre = 'Aldrix';

  $scope.mostrarNumeroDeWatchers = function () {
    console.log('# de Watchers: ', $scope.$$watchersCount);
  };

  $scope.contarUnaVez = function () {
    $scope.unaVezContador = 1;
  };

  $scope.contarMas = function () {
    $scope.contador++;
  };

  $scope.$watch(function () {
    console.log('Ciclo Digest fue disparado!');
  });

  // Otra forma (No recomendado)
  // $scope.$watch('unaVezContador', function (nuevoValor, viejoValor) {
  //   console.log('unaVezContador viejo valor: ', viejoValor);
  //   console.log('unaVezContador nuevo valor: ', nuevoValor);
  // });
  //
  // $scope.$watch('contador', function (nuevoValor, viejoValor) {
  //   console.log('contador viejo valor: ', viejoValor);
  //   console.log('contador nuevo valor: ', nuevoValor);
  // });

  $scope.contarRetraso = function () {
    $timeout(function () {
      $scope.retrasoContador++;
      console.log('Contador incrementado!');
    }, 2000);
  };

  // Otras formas de hacer lo mismo
  // $scope.contarRetraso = function () {
  //   setTimeout(function () {
  //     $scope.$apply(function () {
  //       $scope.contarRetraso++;
  //       console.log('Contador incrementado!');
  //     });
  //   }, 2000);
  // };

  // $scope.contarRetraso = function () {
  //   setTimeout(function () {
  //     $scope.contarRetraso++;
  //     console.log('Contador incrementado!');
  //     $scope.$digest();
  //   }, 2000);
  // };
}

})();