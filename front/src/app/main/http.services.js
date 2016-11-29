(function () {
    'use strict';

    angular
        .module('springbootangularhtml5')
        .factory('HttpService', HttpService);

    /** @ngInject */
    function HttpService($http) {
        return {
            backendService: function () {
                return $http.get('api/service1').then(function (response) {
                    return response.data;
                });
            },
            externalService: function () {
                return $http.get('https://jsonplaceholder.typicode.com/posts/1').then(function (response) {
                    return response.data;
                });
            }
        };
    }
})();
