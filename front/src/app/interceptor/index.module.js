/**
 * This interceptor catch http 200 responses body that
 * contain a specific substring. If the substring is found,
 * then the redirection happens.
 */

(function () {
    'use strict';

    angular
        .module('httpInterceptorModule', [])
        .factory('InterceptorConfigFactory', InterceptorConfigFactory)
        .config(appConfiguration);

    function InterceptorConfigFactory() {
        var subStringToFind = '<meta';

        return {
            redirectUrl: 'http://redirect.me',
            setRedirectUrl: function (url) {
                this.redirectUrl = url;

                return this.redirectUrl;
            },
            getSubStringToFind: function () {
                return subStringToFind;
            }
        };
    }

    function appConfiguration($httpProvider) {
        $httpProvider.interceptors.push(interceptorHandler);
    }

    // we dont want ot call indexOf on something that's not a string
    function isString(obj) {
        return (Object.prototype.toString.call(obj) === '[object String]');
    }

    function interceptorHandler($q, $window, InterceptorConfigFactory) {
        return {
            request: function (config) {
                console.log('config ->', config);

                return config;
            },
            response: function (response) {
                console.log('response ->', response);

                if (isString(response.data) && !!response.data &&
                    -1 !== response.data.indexOf(InterceptorConfigFactory.getSubStringToFind())) {
                    $window.location.href = InterceptorConfigFactory.redirectUrl;
                }

                return response;
            },
            responseError: function (rejection) {
                return $q.reject(rejection);
            }
        };
    }
})();
