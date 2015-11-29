(function() {
  angular.module('app', []);
})();

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

(function() {
  angular.module('app')
    .factory('product', product);

    product.$inject = ['$http'];

    function product($http) {
      var mock = [];

      var product = {
        create: createProduct,
        read: readProduct,
        update: updateProduct,
        delete: deleteProduct,
        list: listProduct
      };

      return product;

      function createProduct(data) {
        var data = {
          sku: data.sku,
          name: data.name,
          stock: data.stock
        };

        return $http.post('/api/product', data);
      }

      function readProduct(id) {
        return $http.get('/api/product/' + id );
      }

      function updateProduct(id, value) {
        return $http.put('/api/product/' + id, value);
      }

      function deleteProduct(id) {
        return $http.delete('/api/product/delete/' + id);
      }

      function listProduct() {
        return $http.get('/api/product');
      }
    }

})();

(function () {
  angular.module('app')
    .filter('percentage', percentage);

    percentage.$inject = ['$filter']

    function percentage($filter) {
      return filter;

      function filter(input, decimals) {
          return $filter('number')(input * 100, decimals) + '%';
      }
    }
})();

//# sourceMappingURL=app.js.map
