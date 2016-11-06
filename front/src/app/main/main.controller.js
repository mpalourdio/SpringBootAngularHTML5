(function () {
    'use strict';

    angular
        .module('springbootangularhtml5')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($http, $log) {
        var vm = this;

        vm.callService = function () {
            $http.get('api/service1').then(function (response) {
                vm.result = response;
            }, function (reason) {
                $log.error(reason);
            });
        };
    }
})();
