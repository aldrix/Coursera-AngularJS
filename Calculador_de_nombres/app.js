(function () {
'use strict';

angular.module('CalculadoraNombre', [])

.controller('CalculadoraNombreControlador', function ($scope) {
  $scope.nombre = "";
  $scope.valorTotal = 0;

  $scope.mostrarNumero = function () {
    var valorTotalNombre = calcularValorNumericoParaString($scope.nombre);
    $scope.valorTotal = valorTotalNombre;
  };

  function calcularValorNumericoParaString(string) {
    var valorTotalString = 0;
    for (var i = 0; i < string.length; i++) {
      valorTotalString += string.charCodeAt(i);
    }
    return valorTotalString;
  }
});

})();
