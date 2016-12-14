(function () {
    'use strict';

    describe('httpInterceptorModule tests', function () {
        var $httpBackend,
            $http,
            interceptorConfigFactory,
            $window,
            urlThatReturnsSpecificHeader,
            urlThatDoesNotReturnSpecificHeader,
            response;

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

            urlThatReturnsSpecificHeader = '/specificheader';
            $httpBackend.whenGET(urlThatReturnsSpecificHeader).respond(null, {'custom-header': '1'});

            urlThatDoesNotReturnSpecificHeader = '/idonthavespecificheader';
            response = {obiwan: "kenobi"};
            $httpBackend.whenGET(urlThatDoesNotReturnSpecificHeader).respond(response);
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should redirect when specific header is found', function () {
            $http.get(urlThatReturnsSpecificHeader);
            $httpBackend.flush();

            expect($window.location.href).toBe(interceptorConfigFactory.redirectUrl);

        });

        it('should simply return response when specific header is NOT found', function () {
            var expectedResponse = null;
            $http.get(urlThatDoesNotReturnSpecificHeader).then(function (response) {
                expectedResponse = response.data;
            });
            $httpBackend.flush();

            expect(expectedResponse.obiwan).toBe(response.obiwan);

        });

        it('should be able to set a custom redirect url', function () {
            var customUrl = 'http://www.example.com';
            interceptorConfigFactory.setRedirectUrl(customUrl);

            expect(interceptorConfigFactory.redirectUrl).toBe(customUrl);
        });
    });
})();
