(function() {
  angular.module('app')
    .filter('percentage', percentage);

    percentage.$inject = ['$filter'];

    function percentage($filter) {
      return filter;

      function filter(input, decimals) {
          return $filter('number')(input * 100, decimals) + '%';
      }
    }
})();
