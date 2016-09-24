(function () {
'use strict';

angular.module('MensajeAplicacion', [])
.controller('MensajeControlador', MensajeControlador)
.filter('ama', AmaFilter)
.filter('sustituir', SustituirFilter);

MensajeControlador.$inject = ['$scope', 'amaFilter', '$filter']; 
//No inyectamos SustituirFilter porque no lo usaremos en el controlador.
function MensajeControlador ($scope, amaFilter, $filter) {
  $scope.estado = "hungry";

  $scope.mostrarMensaje = function () {
   var mensaje = "Yaakov le encanta comer galletas sanas por la noche!";
   return mensaje;
  };

  $scope.mostrarMayusculaMensaje = function () {
    var mensaje = "Yaakov le encanta comer galletas sanas por la noche!";
    var salida = $filter('uppercase') (mensaje);
    return salida;

    //Otra forma es:
    // var salida = $filter('uppercase');
    // var mayuscula = salida(mensaje);
    // return mayuscula;
  };

  $scope.mostrarAmaMensaje = function () {
    var mensaje = "Yaakov le encanta comer galletas sanas por la noche!";
    mensaje = amaFilter(mensaje);
    return mensaje;
  };

  $scope.alimentarYaakov = function () {
    $scope.estado = "fed";
  };
}

function AmaFilter() {
  return function (entrada) {
    entrada = entrada || "";
    entrada = entrada.replace("le encanta", "ama");
    return entrada;
  };
}

function SustituirFilter() {
  return function (entrada, objetivo, reemplazo) {
    entrada = entrada || "";
    entrada = entrada.replace(objetivo, reemplazo);
    return entrada;
  }
}

})();