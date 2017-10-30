'use strict';

// Declare app level module which depends on views, and components

//var userManagementModule = angular.module('UserManagement', []);

var app = angular.module('myApp', [
  'ngRoute',
  'home',
  'userManagement'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
