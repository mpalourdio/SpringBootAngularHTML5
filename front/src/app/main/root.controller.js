(function () {
    'use strict';

    angular
        .module('springbootangularhtml5')
        .controller('RootApplicationController', RootApplicationController);

    /** @ngInject */
    function RootApplicationController($route, $scope) {
        var vm = this;

        console.log($route.current); // this is undefined bacause registred async.

        function routeChangeSuccessListener(currentRoute) {
            console.log('fired second');
            console.log('$routeChangeSuccess', currentRoute);
            console.log(currentRoute.flag);
        }

        function routeChangeStartListener(nextRoute) {
            console.log('fired first');
            console.log('here we could check acl !');
            console.log('$routeChangeStart', nextRoute);
            console.log(nextRoute.flag);
        }

        $scope.$on('$routeChangeSuccess', function (event, currentRoute, previousRoute) {
            console.log(currentRoute == $route.current); //true !!!
            routeChangeSuccessListener(currentRoute);
        });

        $scope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            console.log(currentRoute == $route.current); // true !!!!
            routeChangeStartListener(nextRoute);
        });
    }
})();
