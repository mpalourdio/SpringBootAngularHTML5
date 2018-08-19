/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { forkJoin, Observable } from 'rxjs';
import { HttpService } from '../../../http.service';

@Component({
    selector: 'app-second',
    templateUrl: './second.component.html',
    styleUrls: ['./second.component.scss']
})
export class SecondComponent {

    runImmutableQuery: Observable<String[]>;
    upperCased: String[];
    successQueryResults: String[];
    userAgentResults: String[];
    slowQueryResults: String[];
    errorMessage: any;

    constructor(private httpService: HttpService, private spinner: SpinnerVisibilityService) {
    }

    private resetFields() {
        this.successQueryResults = [];
        this.slowQueryResults = [];
        this.upperCased = [];
        this.errorMessage = [];
        this.userAgentResults = [];
    }

    callServices() {
        this.resetFields();

        forkJoin([
            this.httpService.runSuccessQuery(),
            this.httpService.runSlowQuery(),
            this.httpService.manualObservable()
        ])
            .subscribe(
                results => {
                    console.log(results);
                    this.successQueryResults = results[0];
                    this.slowQueryResults = results[1];
                    this.upperCased = results[2];
                },
                error => this.errorMessage = <any>error
            );
    }

    parseUserAgent() {
        this.resetFields();

        this.httpService.runUserAgent()
            .subscribe(
                results => this.userAgentResults = results,
                error => this.errorMessage = <any>error
            );
    }

    singleServiceCall() {
        this.resetFields();

        this.httpService.runSuccessQuery()
            .subscribe(
                results => this.successQueryResults = results,
                error => this.errorMessage = <any>error
            );
    }

    multipleSubscribe() {
        this.resetFields();
        if (!this.runImmutableQuery) {
            this.runImmutableQuery = this.httpService.runImmutableQuery();
        }

        this.runImmutableQuery
            .subscribe(
                results => this.successQueryResults = ['fake result'],
                error => this.errorMessage = <any>error
            );

        setTimeout(() => {
            this.runImmutableQuery
                .subscribe(
                    results => this.successQueryResults = results,
                    error => this.errorMessage = <any>error
                );
        }, 2000);

        setTimeout(() => {
            this.runImmutableQuery
                .subscribe(
                    results => this.successQueryResults = ['fake result2'],
                    error => this.errorMessage = <any>error
                );
        }, 4000);

        setTimeout(() => {
            this.runImmutableQuery
                .subscribe(
                    results => this.successQueryResults = results,
                    error => this.errorMessage = <any>error
                );
        }, 6000);
    }

    forceShow() {
        this.resetFields();
        this.spinner.show();

        this.httpService.runSlowQuery().then(() =>  this.spinner.hide());
    }
}

