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
            $q.all([HttpService.backendService(), HttpService.externalService()]).then(function (result) {
                vm.result = result[0];
                console.log(result[1]);
            }, function (reason) {
                console.log(reason);
            });
        };

        vm.customHeader = function () {
            HttpService.customHeader();
        };
    }
})();
