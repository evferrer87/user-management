'use strict';

angular.module('home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'mod-home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', [function() {

}]);