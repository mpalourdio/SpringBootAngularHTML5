/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, publishLast, refCount, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';


@Injectable()
export class HttpService {
    success: Observable<any>;

    constructor(private http: HttpClient) {
    }

    runSuccessQuery(): Observable<String[]> {
        return this.http.post(
            'api/service1',
            null
        ).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    runSlowQuery(): Observable<String[]> {
        const headers: HttpHeaders = new HttpHeaders();
        const httpHeaders = headers.append('x-requested-with', 'XmlHttpRequest');

        return this.http.get('http://localhost:10000/my-context/path/api/slowservice',
            {
                'headers': httpHeaders
            }
        ).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    runImmutableQuery(): Observable<String[]> {
        this.success = this.http.post(
            'api/service1',
            null
        ).pipe(
                map(this.extractData),
                catchError(this.handleError),
                publishLast(),
                refCount()
            );
        return this.success;
    }

    manualObservable(): Observable<String[]> {
        return Observable.of(['a', 'b', 'c'])
            .pipe(
                map(r => r.map(a => a.toUpperCase())),
                tap(r => console.log(r)),
                catchError(this.handleError),
            );
    }

    datalist(): Observable<any> {
        return this.http
            .get('api/datalist')
            .pipe(
                map(this.extractData),
                catchError(this.handleError),
            );
    }

    private extractData(res: any) {
        return res || {};
    }

    private handleError(error: HttpErrorResponse | any) {
        return Observable.throw(error);
    }
}
