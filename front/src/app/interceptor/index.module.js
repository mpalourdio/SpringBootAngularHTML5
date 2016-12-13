/**
 * This interceptor catch http 200 responses body that
 * contain a specific header. If the header is found,
 * then the redirection happens.
 */

(function () {
    'use strict';

    angular
        .module('httpInterceptorModule', [])
        .factory('InterceptorConfigFactory', InterceptorConfigFactory)
        .config(appConfiguration);

    function InterceptorConfigFactory() {
        var specificHeader = 'custom-header';

        return {
            redirectUrl: 'http://redirect.me',
            setRedirectUrl: function (url) {
                this.redirectUrl = url;

                return this.redirectUrl;
            },
            getSpecificHeader: function () {
                return specificHeader;
            }
        };
    }

    function appConfiguration($httpProvider) {
        $httpProvider.interceptors.push(interceptorHandler);
    }

    function interceptorHandler($q, $window, InterceptorConfigFactory) {
        return {
            request: function (config) {
                return config;
            },
            response: function (response) {
                if (!!response.headers(InterceptorConfigFactory.getSpecificHeader())) {
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
