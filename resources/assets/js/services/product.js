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
