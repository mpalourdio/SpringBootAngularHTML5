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
import { forkJoin } from 'rxjs';
import { HttpService } from '../../../http.service';

@Component({
    selector: 'app-second',
    templateUrl: './second.component.html',
    styleUrls: ['./second.component.scss']
})
export class SecondComponent {

    public fastQueryResult: string[];
    public slowQueryResult: string[];
    public errorMessage: any;

    constructor(private httpService: HttpService, private spinner: SpinnerVisibilityService) {
    }

    private resetFields(): void {
        this.fastQueryResult = undefined;
        this.slowQueryResult = undefined;
        this.errorMessage = undefined;
    }

    public callAllQueries(): void {
        this.resetFields();

        forkJoin([
            this.httpService.runFastQuery(),
            this.httpService.runSlowQuery(),
        ])
            .subscribe(
                results => {
                    console.log(results);
                    this.fastQueryResult = results[0];
                    this.slowQueryResult = results[1];
                },
                error => this.errorMessage = error as any
            );
    }

    public fastQuery(): void {
        this.resetFields();

        this.httpService.runFastQuery()
            .subscribe(
                results => this.fastQueryResult = results,
                error => this.errorMessage = error as any
            );
    }

    public slowQuery(): void {
        this.resetFields();

        this.httpService.runSlowQuery()
            .subscribe(
                results => this.slowQueryResult = results,
                error => this.errorMessage = error as any
            );
    }

    public reactiveQuery(): void {
        this.resetFields();

        this.httpService.runReactiveQuery()
            .subscribe(
                results => this.slowQueryResult = results,
                error => this.errorMessage = error as any
            );
    }

    public forceSpinner(): void {
        this.resetFields();
        this.spinner.show();
        this.httpService.runSlowQuery().subscribe(
            () => this.spinner.hide(),
            () => this.spinner.hide()
        );
    }
}

