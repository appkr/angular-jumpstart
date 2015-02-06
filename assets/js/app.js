(function() {

  var routes = function($routeProvider) {
    $routeProvider
      .when("/", {
        controller: "CustomersController",
        templateUrl: "views/customers.html"
      })
      .when("/orders/:customerId", {
        controller: "OrdersController",
        templateUrl: "views/orders.html"
      })
      .when("/orders", {
        controller: "OrdersController",
        templateUrl: "views/all-orders.html"
      })
      .otherwise({
        redirectTo: "/"
      });
  };

  var appSettings = {
    title: "AngularJS - JumpStart",
    version: "0.0.0"
  };

  routes.$inject = ["$routeProvider"];

  angular.module("customersApp", ["ngRoute", "ngAnimate"])
    .config(routes)
    .constant("appSettings", appSettings);

})();
