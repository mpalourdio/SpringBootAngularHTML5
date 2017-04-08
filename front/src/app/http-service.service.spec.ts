/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { inject, TestBed } from '@angular/core/testing';

import { HttpServiceService } from './http-service.service';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpInterceptorService, HttpInterceptorServiceFactory } from './http-interceptor.service';

describe('HttpServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                HttpServiceService,
                {
                    provide: HttpInterceptorService,
                    useFactory: HttpInterceptorServiceFactory,
                    deps: [XHRBackend, RequestOptions]
                }
            ]
        });
    });

    it('should ...', inject([HttpServiceService], (service: HttpServiceService) => {
        expect(service).toBeTruthy();
    }));
});
