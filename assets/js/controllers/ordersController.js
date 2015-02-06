(function() {

  var OrdersController = function ($scope, $routeParams, customersFactory, appSettings) {
    var customerId = $routeParams.customerId;
    $scope.orders = [];
    $scope.ordersTotal = 0.0;
    $scope.totalType;
    $scope.customer = null;
    $scope.appSettings = appSettings;

    function init() {
      customersFactory.getCustomers()
        .success(function(customers) {
          getCustomer(customers);
          getOrders(customers);
          getOrdersTotal();
        })
        .error(function(data, status, headers, config) {
          $log.log(data.error + " " + status);
        });
    }

    function getCustomer(customers) {
      for (var i = 0, len = customers.length; i < len; i++) {
        if (customers[i].id === parseInt(customerId)) {
          $scope.customer = customers[i];
          break;
        }
      }
      return {};
    }

    function getOrders(customers) {
      var orders = [];

      for (var i = 0, len = customers.length; i < len; i++) {
        if (customers[i].orders) {
          for (var j = 0, olen = customers[i].orders.length; j < olen; j++) {
            orders.push(customers[i].orders[j]);
          }
        }
      }

      $scope.orders = orders;

      return;
    }

    function getOrdersTotal() {
      var total = 0;

      for(var i = 0, len = $scope.orders.length; i < len; i++) {
        total += $scope.orders[i].total;
      }

      $scope.ordersTotal = total;
      $scope.totalType = ($scope.ordersTotal > 100) ? "success" : "danger";
    }

    init();

  };

  OrdersController.$inject = ["$scope", "$routeParams", "customersFactory", "appSettings"];

  angular.module("customersApp").controller("OrdersController", OrdersController);
})();