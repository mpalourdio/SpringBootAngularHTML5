/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {
    }

    runFastQuery$(): Observable<string[] | object> {
        return this.http.post(
            'api/fast',
            null
        ).pipe(
            map(this.extractData),
            catchError(this.handleError$)
        );
    }

    runSlowQuery$(): Observable<string[] | object> {
        return this.http.get('http://localhost:10000/my-context/path/api/slow',
            {
                headers: {
                    'x-requested-with': 'XmlHttpRequest'
                }
            }
        ).pipe(
            map(this.extractData),
            catchError(this.handleError$)
        );
    }

    runReactiveQuery$(): Observable<string[] | object> {
        return this.http
            .get('api/slow-but-reactive')
            .pipe(
                map(this.extractData),
                catchError(this.handleError$)
            );
    }

    private extractData(res: unknown): string[] | object {
        return res || {};
    }

    private handleError$(error: HttpErrorResponse | unknown): Observable<never> {
        console.log(error);
        return throwError(() => error);
    }
}
