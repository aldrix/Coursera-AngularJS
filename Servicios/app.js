(function () {
'use strict';

angular.module('ListaComprasAplicacion', [])
.controller('ListaComprasAgregarControlador', ListaComprasAgregarControlador)
.controller('ListaComprasMostrarControlador', ListaComprasMostrarControlador)
.service('ListaComprasServicio', ListaComprasServicio);

ListaComprasAgregarControlador.$inject = ['ListaComprasServicio'];
function ListaComprasAgregarControlador(ListaComprasServicio) {
  var agregador = this;

  agregador.nombre = '';
  agregador.cantidad = '';

  agregador.agregarItem = function () {
    ListaComprasServicio.agregarItem(agregador.nombre, agregador.cantidad);
  }
}

ListaComprasMostrarControlador.$inject = ['ListaComprasServicio'];
function ListaComprasMostrarControlador(ListaComprasServicio) {
  var mostrarLista = this;

  mostrarLista.listaItems = ListaComprasServicio.obtenerItems();

  mostrarLista.eliminarItem = function(indiceItem) {
    ListaComprasServicio.eliminarItem(indiceItem);
  };
}

function ListaComprasServicio() {
  var servicio = this;
  var listaItems = [];

  servicio.agregarItem = function(nombreItem, cantidadItem) {
    var item = {
      nombre: nombreItem,
      cantidad: cantidadItem
    };
    listaItems.push(item);
  };

  servicio.eliminarItem = function (indiceItem) {
    listaItems.splice(indiceItem, 1);
  };

  servicio.obtenerItems = function () {
    return listaItems;
  };
}

})();