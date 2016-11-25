(function () {
    'use strict';

    angular
        .module('springbootangularhtml5')
        .config(routeConfig);

    function routeConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm',
                flag: 'I\'m a flag'
            })

            .when('/home/iam/a/very/long/url', {
                templateUrl: 'app/main/second.html',
                controller: 'MainController',
                controllerAs: 'vm',
                flag: 'I\'am a flag too'
            })
            .otherwise({
                redirectTo: '/home'
            });

        $locationProvider.html5Mode(true);
    }

})();
