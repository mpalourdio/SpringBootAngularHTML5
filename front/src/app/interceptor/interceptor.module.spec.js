(function () {
    'use strict';

    describe('httpInterceptorModule tests', function () {
        var $httpBackend,
            $http,
            interceptorConfigFactory,
            $window,
            url;

        beforeEach(module('httpInterceptorModule'));

        //ugly, but necessery to reset $window
        beforeEach(module('httpInterceptorModule', function ($provide) {
            $provide.value('$window', {
                location: {
                    href: null
                }
            });
        }));

        beforeEach(inject(function (_$httpBackend_, _$http_, _InterceptorConfigFactory_, _$window_) {
            $httpBackend = _$httpBackend_;
            $http = _$http_;
            interceptorConfigFactory = _InterceptorConfigFactory_;
            $window = _$window_;

            url = '/whatever';
            $httpBackend.whenGET(url).respond(null, {'custom-header': '1'});
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should redirect when specific header is found', function () {
            $http.get(url);
            $httpBackend.flush();
            expect($window.location.href).toBe(interceptorConfigFactory.redirectUrl);

        });

        it('should be able to set a custom redirect url', function () {
            var customUrl = "http://www.example.com";
            interceptorConfigFactory.setRedirectUrl(customUrl);
            expect(interceptorConfigFactory.redirectUrl).toBe(customUrl);
        });
    });
})();
