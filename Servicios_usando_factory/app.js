(function () {
'use strict';

angular.module('ListaComprasAplicacion', [])
.controller('ListaComprasControlador1', ListaComprasControlador1)
.controller('ListaComprasControlador2', ListaComprasControlador2)
.factory('ListaComprasFactory', ListaComprasFactory);

// LISTA #1 - controlador
ListaComprasControlador1.$inject = ['ListaComprasFactory'];
function ListaComprasControlador1(ListaComprasFactory) {
  var lista1 = this;

  // Usamos factory para crear un nuevo servicio de lista de compras
  var listaCompras = ListaComprasFactory();

  lista1.listaItems = listaCompras.obtenerItems();

  lista1.nombre = '';
  lista1.cantidad = '';

  lista1.agregarItem = function () {
    listaCompras.agregarItem(lista1.nombre, lista1.cantidad);
  }

  lista1.eliminarItem = function (indiceItem) {
    listaCompras.eliminarItem(indiceItem);
  };
}


// LISTA #2 - controlador
ListaComprasControlador2.$inject = ['ListaComprasFactory'];
function ListaComprasControlador2(ListaComprasFactory) {
  var lista2 = this;

  // Usamos factory para crear un nuevo servicio de lista de compras
  var listaCompras = ListaComprasFactory(3);

  lista2.listaItems = listaCompras.obtenerItems();

  lista2.nombre = '';
  lista2.cantidad = '';

  lista2.agregarItem = function () {
    try {
      listaCompras.agregarItem(lista2.nombre, lista2.cantidad);
    } catch (error) {
      lista2.mensajeError = error.message;
    }

  }

  lista2.eliminarItem = function (indiceItem) {
    listaCompras.eliminarItem(indiceItem);
  };
}


// Si no es especificado, se asume maxItems como ilimitado
function ListaComprasServicio(maxItems) {
  var servicio = this;

  // Lista de items de compra
  var listaItems = [];

  servicio.agregarItem = function (nombreItem, cantidadItem) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (listaItems.length < maxItems)) {
      var item = {
        nombre: nombreItem,
        cantidad: cantidadItem
      };
      listaItems.push(item);
    }
    else {
      throw new Error("Maximo numero de items (" + maxItems + ") alcanzado.");
    }
  };

  servicio.eliminarItem = function (indiceItem) {
    listaItems.splice(indiceItem, 1);
  };

  servicio.obtenerItems = function () {
    return listaItems;
  };
}


function ListaComprasFactory() {
  var factory = function (maxItems) {
    return new ListaComprasServicio(maxItems);
  };

  return factory;
}

})();
