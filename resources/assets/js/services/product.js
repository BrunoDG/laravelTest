(function() {
  angular.module('app')
    .factory('product', productService);

    productService.$inject = ['$http'];

    function productService($http) {
      var mock = [];

      var product = {
        create: createProduct,
        read: readProduct,
        update: updateProduct,
        delete: deleteProduct,
        list: listProduct
      };

      return product;

      function createProduct(product) {
        var data = {
          sku: product.sku,
          name: product.name,
          stock: product.stock
        };

        return $http.post('/api/product', data);
      }

      function readProduct(id) {
        return $http.get('/api/product/' + id);
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
