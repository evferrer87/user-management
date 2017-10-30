app.service('UserService', function($q, $http, UrlConfig) {

    var self = this;
    var urlConfig = UrlConfig.build('http://localhost:8080');

    this.add = function(user) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: urlConfig.baseUrl + '/addUser',
            dataType: 'json',
            data: user
        }).then(function successCallback(response) {
            if (response.data.result !== null) {
                deferred.resolve(response.data.result);
            } else {
                deferred.reject('User not inserted');
            }
        }, function errorCallback(response) {
            var message = response.data.message;
            if (response.status == -1) {
                message = 'Restful web service ' + urlConfig.baseUrl + '/addUser down!';
            }
            deferred.reject(message);
        });
        return deferred.promise;
    }

    this.getAll = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: urlConfig.baseUrl + '/getAllUser',
            dataType: 'json',
        }).then(function successCallback(response) {
            deferred.resolve(response.data.result);
        }, function errorCallback(response) {
            var message = "Unknown error.";
            if (response.status == -1) {
                message = 'Restful web service ' + urlConfig.baseUrl + '/getAllUser down!';
            }
            deferred.reject(message);
        });
        return deferred.promise;
    }


    this.update = function(user) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: urlConfig.baseUrl + '/updateUser',
            dataType: 'json',
            data: user
        }).then(function successCallback(response) {
            deferred.resolve(response.data.result);
        }, function errorCallback(response) {
            var message = response.data.message;
            if (response.status == -1) {
                message = 'Restful web service ' + urlConfig.baseUrl + '/updateUser down!';
            }
            deferred.reject(message);
        });
        return deferred.promise;
    }

    this.delete = function(user) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: urlConfig.baseUrl + '/deleteUser',
            dataType: 'json',
            data: user
        }).then(function successCallback(response) {
            deferred.resolve();
        }, function errorCallback(response) {
            var message = response.data.message;
            if (response.status == -1) {
                message = 'Restful web service ' + urlConfig.baseUrl + '/deleteUser down!';
            }
            deferred.reject(message);
        });
        return deferred.promise;
    }
});