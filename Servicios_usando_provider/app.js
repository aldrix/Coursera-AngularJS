(function () {
'use strict';

angular.module('ListaComprasAplicacion', [])
.controller('ListaComprasControlador', ListaComprasControlador)
.provider('ListaComprasServicio', ListaComprasServicioProvider)
.config(Config);

Config.$inject = ['ListaComprasServicioProvider'];
function Config(ListaComprasServicioProvider) {
  ListaComprasServicioProvider.defaults.maxItems = 2;
}

ListaComprasControlador.$inject = ['ListaComprasServicio'];
function ListaComprasControlador(ListaComprasServicio) {
  var lista = this;

  lista.listaItems = ListaComprasServicio.obtenerItems();

  lista.nombre = '';
  lista.cantidad = '';

  lista.agregarItem = function () {
    try {
      ListaComprasServicio.agregarItem(lista.nombre, lista.cantidad);
    } catch (error) {
      lista.mensajeError = error.message;
    }
  };

  lista.eliminarItem = function (indiceItem) {
    ListaComprasServicio.eliminarItem(indiceItem);
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


function ListaComprasServicioProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var listaCompras = new ListaComprasServicio(provider.defaults.maxItems);

    return listaCompras;
  };
}

})();
