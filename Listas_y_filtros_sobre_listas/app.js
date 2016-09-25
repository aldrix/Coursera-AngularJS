(function () { 
'use strict';

var listaEmpleados = [{nombre:'Aldrix Marfil',  cargo:'Programador'},
                      {nombre:'Miguel Rivas',   cargo:'Botones'},
                      {nombre:'Leonardo Perez', cargo:'Programador'},
                      {nombre:'Vanessa Rivas',  cargo:'Gerente'}];

angular.module('ListaEmpleadosAplicacion', [])
.controller('ListaEmpleadosControlador', ListaEmpleadosControlador);

ListaEmpleadosControlador.$inject = ['$scope'];
function ListaEmpleadosControlador($scope) {
  $scope.listaEmpleados = listaEmpleados; 

  $scope.agregar = function () {
    var nuevoEmpleado = {
      nombre: $scope.nuevoNombreEmpleado,
      cargo: $scope.nuevoCargoEmpleado
    };

    $scope.listaEmpleados.push(nuevoEmpleado);
  };
}

})(); 