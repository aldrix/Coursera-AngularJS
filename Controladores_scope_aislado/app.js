(function () {
'use strict';

angular.module('ListaCompraAplicacion',[])
.controller('ListaCompraControlador1', ListaCompraControlador1)
.controller('ListaCompraControlador2', ListaCompraControlador2)
.service('ListaCompraServicio', ListaCompraServicio)
.factory('ListaCompraFactory', ListaCompraFactory)
.directive('shoppingList', ListaCompra);

function ListaCompra() {
  var ddo = {  //Directive Definition Object
    templateUrl: 'shoppingList.html',
    scope: {
      lista: '=myList',
      titulo: '@title'
    }
  };

  return ddo;
}


// LISTA #1 - controlador
ListaCompraControlador1.$inject = ['ListaCompraFactory'];
function ListaCompraControlador1(ListaCompraFactory) {
  var lista = this;

  //Usamos factory para crear un nuevo servicio de lista de compra.
  var listaCompra = ListaCompraFactory();

  lista.items = listaCompra.obtenerItems();

  var tituloOrig = 'Lista de compra #1';
  lista.titulo = tituloOrig + ' (' + lista.items.length + ' items)'; 

  lista.nombreItem = "";
  lista.cantidadItem = "";

  lista.agregarItem = function () {
    listaCompra.agregarItem(lista.nombreItem, lista.cantidadItem);
    lista.titulo = tituloOrig + ' (' + lista.items.length + ' items)';
  }

  lista.eliminarItem = function (indiceItem) {
    listaCompra.eliminarItem(indiceItem);
    lista.titulo = tituloOrig + ' (' + lista.items.length + ' items)';
  };
}


// LISTA #2 - controlador
ListaCompraControlador2.$inject = ['ListaCompraFactory'];
function ListaCompraControlador2(ListaCompraFactory) {
  var lista = this;

  //Usamos factory para crear un nuevo servicio de lista de compra.
  var listaCompra = ListaCompraFactory(3);

  lista.items = listaCompra.obtenerItems();

  lista.nombreItem = "";
  lista.cantidadItem = "";

  lista.agregarItem = function () {
    try {
      listaCompra.agregarItem(lista.nombreItem, lista.cantidadItem);
    } catch (error) {
      lista.errorMessage = error.message;
    }
  }

  lista.eliminarItem = function (indiceItem) {
    listaCompra.eliminarItem(indiceItem);
  };
}

//Si no se espcifica maxItems se asume ilimitado.
function ListaCompraServicio(maxItems) {
  var servicio = this;

  //Lista de items de compra.
  var items = [];

  servicio.agregarItem = function (nombreItem, cantidadItem) {
    if((maxItems === undefined) || 
       (maxItems!== undefined) && (items.length < maxItems)) {
      var item = {
        nombre: nombreItem,
        cantidad: cantidadItem
      };
      items.push(item);
    }
    else {
      throw new Error("Maximo numero de items (" + maxItems + ") fue alcanzado.");
    }
  };

  servicio.eliminarItem = function (indiceItem) {
    items.splice(indiceItem, 1);
  };

  servicio.obtenerItems = function () {
    return items;
  };
}

function ListaCompraFactory() {
  var factory = function (maxItems) {
    return new ListaCompraServicio(maxItems);
  };

  return factory;
}

})();