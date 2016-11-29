(function () {
    'use strict';

    angular
        .module('springbootangularhtml5')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(HttpService, $q) {
        var vm = this;

        vm.callServices = function () {
            $q.all([HttpService.backendService(), HttpService.externalService()]).then(function (result) {
                vm.result = result[0];
                console.log(result[1]);
            }, function (reason) {
                console.log(reason);
            });
        };
    }
})();
