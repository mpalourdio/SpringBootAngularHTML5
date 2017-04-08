/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-second',
    templateUrl: './second.component.html',
    styleUrls: ['./second.component.css'],
    providers: [HttpServiceService]
})
export class SecondComponent {
    successQueryResults: String[];
    slowQueryResults: String[];
    errorMessage: any;

    constructor(private httpService: HttpServiceService) {
    }

    callServices() {
        this.successQueryResults = [];
        this.slowQueryResults = [];
        this.errorMessage = [];

        Observable.forkJoin([
            this.httpService.runSuccessQuery(),
            this.httpService.runSlowQuery()
        ])
            .subscribe(
                results => {
                    console.log(results);
                    this.successQueryResults = results[0];
                    this.slowQueryResults = results[1];
                },
                error => this.errorMessage = <any>error
            );
    }

    singleServiceCall() {
        this.successQueryResults = [];
        this.slowQueryResults = [];
        this.httpService.runSuccessQuery()
            .subscribe(
                results => this.successQueryResults = results,
                error => this.errorMessage = <any>error
            );
    }

    customHeader() {
        this.successQueryResults = [];
        this.slowQueryResults = [];
        this.httpService.runCustomHeaderQuery()
            .subscribe(
                results => this.successQueryResults = results,
                error => this.errorMessage = <any>error
            );
    }
}

