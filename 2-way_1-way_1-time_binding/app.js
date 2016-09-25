(function () {
'use strict';

angular.module('BindingAplicacion',[])
.controller('BindingControlador', BindingControlador);

BindingControlador.$inject = ['$scope'];
function BindingControlador ($scope) {
	$scope.primerNombre = 'Aldrix';

	$scope.mostrarNumeroDeWatchers = function () {
		console.log('# de Watchers: ', $scope.$$watchersCount);
	};

	$scope.modificarNombreCompleto = function () {
		$scope.nombreCompleto = $scope.primerNombre + ' ' + 'Marfil';
	};

	$scope.logPrimerNombre = function () {
		console.log('Primer nombre es: ', $scope.primerNombre);
	};

	$scope.logNombreCompleto = function () {
		console.log('Nombre completo es: ', $scope.nombreCompleto);
	};
}

})();