'use strict';

angular.module('userManagement', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userManagement', {
    templateUrl: 'mod-userManagement/user-management.html',
    controller: 'UserManagementCtrl'
  });
}])

.controller('UserManagementCtrl', function($scope, User, ArrayUtil, $rootScope, $q, GlobalFunc, UserService) {

    UserService.getAll().then(function(users) {
        $scope.users = users;
    }, function (message) {
        console.log(message);
        alert(message);
    })

    $scope.user = User.init();
    $scope.addUser = function() {
        $scope.changeName();
        $scope.changeEmail();
        if ($scope.userValid($scope.user)) {
            UserService.add($scope.user).then(function(user) {
                $scope.users.push(user);
                $scope.user = User.init();
            }, function(message){
               alert(message);
            });
        }
    }

    $scope.updateUser = function() {
        var deferred = $q.defer();
        if ($scope.userValid($scope.userToEdit)) {
            UserService.update($scope.userToEdit).then(function(user) {
                ArrayUtil.updateElem($scope.users, user);
                deferred.resolve();
            }, function() {
                deferred.reject("Invalid user");
            })
        }
        return deferred.promise;
    };

    $scope.userValid = function(user) {
        var nameValidation = $scope.validateName(user.name),
            emailValidation = $scope.validateEmail(user.email);
        return (nameValidation && emailValidation);
    }

    $scope.deleteUser = function(user) {
        var deferred = $q.defer();
        UserService.delete(user).then(function() {
            ArrayUtil.remove($scope.users, user.id);
            deferred.resolve();
        }, function(message) {
            deferred.reject(message);
        });
        return deferred.promise;
    };

    $scope.validateEmail = function(email) {
        if (!GlobalFunc.checkEmail(email)) {
            return false;
        }
        return true;
    }

    $scope.validateName = function (name) {
        if (name == '' || name == undefined) {
            return false;
        }
        return true;
    }

    $scope.columns = [
        { "data": "name" },
        { "data": "email" },
    ];

    var updateUserFromTableToScope = function (user) {
        $scope.userToEdit = user;
        $scope.$apply();
    }

    $rootScope.$on('editModalOpen deleteModalOpen', function(event, data) {
        updateUserFromTableToScope(data.row);
    });

    $rootScope.$on('deleteModalOpen', function(event, data) {
        updateUserFromTableToScope(data.row);
    });

    var nameErrorMessage = 'Enter a valid name';
    $scope.nameError = nameErrorMessage;

    var emailErrorMessage = 'Enter a valid email';
    $scope.emailError = emailErrorMessage;

    $scope.changeName = function(name) {
        if ($scope.validateName(name)) {
            $scope.nameError = '';
            return;
        }
        $scope.nameError = nameErrorMessage;
    }

    $scope.changeEmail = function(email) {
        if ($scope.validateEmail(email)) {
            $scope.emailError = '';
            return;
        }
        $scope.emailError = emailErrorMessage;
    }

});