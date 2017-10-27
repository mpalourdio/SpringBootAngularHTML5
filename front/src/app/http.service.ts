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
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
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
        )
            .map(this.extractData)
            .catch(this.handleError);
    }

    runSlowQuery(): Observable<String[]> {
        const headers: HttpHeaders = new HttpHeaders();
        const httpHeaders = headers.append('x-requested-with', 'XmlHttpRequest');

        return this.http.get('http://localhost:10000/my-context/path/api/slowservice',
            {
                'headers': httpHeaders
            }
        )
            .map(this.extractData)
            .catch(this.handleError);
    }

    runImmutableQuery(): Observable<String[]> {
        this.success = this.http.get('api/service1')
            .map(this.extractData)
            .catch(this.handleError)
            .publishLast()
            .refCount();
        return this.success;
    }

    manualObservable(): Observable<String[]> {
        return Observable.of(['a', 'b', 'c'])
            .map(r => r.map(a => a.toUpperCase()))
            .do(r => console.log(r))
            .catch(this.handleError);
    }

    datalist(): Observable<any> {
        return this.http
            .get('api/datalist')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: any) {
        return res || {};
    }

    private handleError(error: HttpErrorResponse | any) {
        return Observable.throw(error);
    }
}
