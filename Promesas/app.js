(function () {
'use strict';

angular.module('ShoppingListPromiseApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('WeightLossFilterService', WeightLossFilterService);

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    ShoppingListService.addItem(list.itemName, list.itemQuantity);
  }

  list.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}


ShoppingListService.$inject = ['$q', 'WeightLossFilterService']
function ShoppingListService($q, WeightLossFilterService) {
  var service = this;

  // List of shopping items
  var items = [];

  // Opcion 1: Manejando los mensajes de error directamente. 
  // VERSION SINCRONA.
  //
  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  //
  //   promise.then(function (response) { //Verifica primero la cantidad (checkQuantity) antes de continuar.
  //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
  //
  //     nextPromise.then(function (result) {
  //       var item = {
  //         name: name,
  //         quantity: quantity
  //       };
  //       items.push(item);
  //     }, function (errorResponse) {  //Muestra este mensaje si falla nextPromise.
  //       console.log(errorResponse.message);
  //     });
  //   }, function (errorResponse) {    //Muestra este mensaje si falla promise.
  //     console.log(errorResponse.message);
  //   });
  // };

  // Opcion 2: Sin manejar los mensajes de error directamente.
  // VERSION SINCRONA.
  //
  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  //
  //   promise
  //   .then(function (response) {
  //     return WeightLossFilterService.checkQuantity(quantity);
  //   })
  //   .then(function (response) { //Si se ejecuta esto es porque checkQuantity paso.
  //     var item = {
  //       name: name,
  //       quantity: quantity
  //     };
  //     items.push(item);
  //   })
  //   .catch(function (errorResponse) { //Captura un mensaje de error de cualquiera de las promesas que devuelva uno.
  //     console.log(errorResponse.message);
  //   });
  // };


  //Ejecuta las promesas en paralelo.
  // VERSION ASINCRONA. 
  service.addItem = function (name, quantity) {
    var namePromise = WeightLossFilterService.checkName(name);
    var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

    $q.all([namePromise, quantityPromise]).
    then(function (response) {  //Esto se ejecutara cuando todas las promesas sean resueltas.
      var item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
    })
    .catch(function (errorResponse) {  //Esto se ejecutara cuando alguna de las promesas se cancele. 
    	                               //Las otras promesas se detendran si una falla.
      console.log(errorResponse.message);
    });
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


WeightLossFilterService.$inject = ['$q', '$timeout']
//Usaremos $timeout para simular un comportamiento asincrono usando distintos tiempos de ejecucion para cada filtro.
function WeightLossFilterService($q, $timeout) {
  var service = this;

  service.checkName = function (name) {
    var deferred = $q.defer();  //Define el contexto para un comportamiento asincrono.

    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for cookies
      if (name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result)  //Completa satisfactoriamente la promesa.
      }
      else {
        result.message = "Stay away from cookies, Yaakov!";
        deferred.reject(result);  //Completa insatisfactoriamente la promesa y muestra mensaje de error.
      }
    }, 3000);

    return deferred.promise; //Retorna la promesa a su llamador.
  };


  service.checkQuantity = function (quantity) {
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for too many boxes
      if (quantity < 6) {
        deferred.resolve(result);
      }
      else {
        result.message = "That's too much, Yaakov!";
        deferred.reject(result);
      }
    }, 1000);

    return deferred.promise;
  };
}

})();
