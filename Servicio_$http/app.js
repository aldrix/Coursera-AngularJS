(function () {
'use strict';

angular.module('MenuCategoriasAplicacion', [])
.controller('MenuCategoriasControlador', MenuCategoriasControlador)
.service('MenuCategoriasServicio', MenuCategoriasServicio)
.constant('ApiRutaBase', "http://davids-restaurant.herokuapp.com");


MenuCategoriasControlador.$inject = ['MenuCategoriasServicio'];
function MenuCategoriasControlador(MenuCategoriasServicio) {
  var menu = this;

  var promesa = MenuCategoriasServicio.obtenerMenuCategorias();

  promesa.then(function (respuesta) {
    menu.categorias = respuesta.data;  //Obtenemos la respuesta en el scope.
  })
  .catch(function (error) {
    console.log("Algo terrible ocurrio.");
  });

  menu.logMenuItems = function (nombreCorto) {
    var promesa = MenuCategoriasServicio.obtenerMenuPorCategorias(nombreCorto);

    promesa.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


//Hace la conexion con el API REST.
MenuCategoriasServicio.$inject = ['$http', 'ApiRutaBase']
function MenuCategoriasServicio($http, ApiRutaBase) {
  var servicio = this;

  servicio.obtenerMenuCategorias = function () {
    var respuesta = $http({
      method: "GET",
      url: (ApiRutaBase + "/categories.json")
    });

    return respuesta;
  };


  servicio.obtenerMenuPorCategorias = function (nombreCorto) {
    var respuesta = $http({
      method: "GET",
      url: (ApiRutaBase + "/menu_items.json"),
      params: {
        category: nombreCorto
      }
    });

    return respuesta;
  };

}

})();
