/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Injectable } from '@angular/core';
import {
    ConnectionBackend,
    Http,
    Request,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    XHRBackend
} from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

const CUSTOM_HEADER_NAME = 'custom-header';

@Injectable()
export class HttpInterceptorService extends Http {
    private pendingRequests = 0;
    private pendingRequestsStatus: Subject<boolean> = new Subject<boolean>();
    private customHeaderPresence: Subject<boolean> = new Subject<boolean>();

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    getPendingRequestStatusSubject() {
        return this.pendingRequestsStatus;
    }

    getCustomHeaderPresenceSubject() {
        return this.customHeaderPresence;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        this.pendingRequests++;

        if (1 === this.pendingRequests) {
            this.pendingRequestsStatus.next(true);
        }

        return super.request(url, options)
            .map(result => {
                if (result.headers.has(CUSTOM_HEADER_NAME)) {
                    this.handleCustomHeader();
                }

                return result;
            })
            .catch((error) => {
                return error;
            })
            .finally(() => {
                this.pendingRequests--;

                if (0 === this.pendingRequests) {
                    this.pendingRequestsStatus.next(false);
                }
            });
    }

    private handleCustomHeader() {
        this.customHeaderPresence.next(true);
    }
}

export function HttpInterceptorServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
    return new HttpInterceptorService(backend, defaultOptions);
}
