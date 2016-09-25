(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showToBuyItems = this;

  showToBuyItems.listToBuyItems = ShoppingListCheckOffService.getListToBuyItems();
  
  showToBuyItems.passItem = function(itemIndex) {
    ShoppingListCheckOffService.passItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showBoughtItems = this;

  showBoughtItems.listBoughtItems = ShoppingListCheckOffService.getListBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  var listToBuyItems  = [{name: 'Cookies',       quantity: 10},
                         {name: 'Chips',         quantity: 5},
                         {name: 'Chocolate',     quantity: 6},
                         {name: 'Sugary drinks', quantity: 2},
                         {name: 'Lolly pop',     quantity: 12}];
  var listBoughtItems = [];
  var message = '';

  service.passItem = function(itemIndex) {
    listBoughtItems.push(listToBuyItems[itemIndex]);
    listToBuyItems.splice(itemIndex,1);
  };

  service.getListToBuyItems = function() {
    return listToBuyItems;
  };

  service.getListBoughtItems = function() {
    return listBoughtItems;
  };
}

})();