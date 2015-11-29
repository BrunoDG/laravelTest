(function() {
  angular.module('app')
    .controller('nav', navController);

  navController.$inject = ['$scope', 'product'];

  function navController($scope, product) {
    var vm = this;
    var allStock = 0;

    vm.products = [];

    vm.product = {
      id: '',
      sku: '',
      name: '',
      stock: ''
    };

    vm.save = saveProduct;
    vm.delete = deleteProduct;
    vm.edit = editProduct;
    vm.mix = mix;

    updateList();

    function updateList() {
      product.list().then(calcMix);
    }

    function saveProduct($valid) {
      if(!$valid) {
        return ;
      }

      if (vm.product.id) {
        product.update(vm.product.id, vm.product).then(updateList).catch(function() {
          alert("SKU duplicado, favor alterar.");
        });
      }

      if (!vm.product.id) {
        product.create(vm.product).then(updateList).catch(function() {
          alert("SKU duplicado, favor alterar.");
        });;
      }

    }

    function deleteProduct(id) {
      product.delete(id).then(updateList);
    }

    function editProduct(id) {
      product.read(id).then(function(response) {
        vm.product = response.data;
      });
    }

    function mix(stock) {

      if (parseInt(allStock) === 0 || parseInt(stock) === 0) {
        return 0;
      }

      return stock / allStock;
    }

    function calcMix(response) {
      var item = 0;

      vm.products = response.data;

      for (item in vm.products) {
        allStock += parseInt(vm.products[item].stock);
      }
    }

  }
})();
