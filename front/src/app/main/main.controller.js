(function () {
    'use strict';

    angular
        .module('springbootangularhtml5')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(HttpService, $q, $location) {
        var vm = this;
        vm.isHtml5Enabled = $location.$$html5;

        vm.callServices = function () {
            $q.all([
                HttpService.backendService(),
                HttpService.unknownService(),
                HttpService.externalService(),
                HttpService.backendService(),
                HttpService.unknownService(),
                HttpService.externalService(),
                HttpService.backendService(),
                HttpService.unknownService(),
                HttpService.externalService()]).then(function (result) {
                vm.result = result[0]; //won't happen, as some requests fail
            }, function (reason) {
                console.log(reason);
                HttpService.backendService().then(function (result) {
                    vm.result = result;
                });
            });
        };

        vm.customHeader = function () {
            HttpService.customHeader();
        };
    }
})();
