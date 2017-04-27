angular
  .module('pvaproxyapp', ['ngRoute', 'ngMaterial'])
  .config(pvaProxyRoute);

function pvaProxyRoute ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/index.html',
      controller: 'indexCtrl',
      controllerAs: 'indexctrl',
    })
    .otherwise({
      redirectTo: '/',
    });
}