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
import { JsonPipe } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-second',
    templateUrl: './second.component.html',
    standalone: true,
    styleUrls: ['./second.component.scss'],
    imports: [JsonPipe, RouterLink]
})
export class SecondComponent {

    fastQueryResult!: string[] | object | null;
    slowQueryResult!: string[] | object | null;
    errorMessage: string | undefined;

    constructor(private httpService: HttpService, private spinner: SpinnerVisibilityService) {
    }

    private resetFields(): void {
        this.fastQueryResult = null;
        this.slowQueryResult = null;
        this.errorMessage = undefined;
    }

    callAllQueries(): void {
        this.resetFields();

        forkJoin([
            this.httpService.runFastQuery(),
            this.httpService.runSlowQuery(),
        ])
            .subscribe({
                    next: results => {
                        console.log(results);
                        this.fastQueryResult = results[0];
                        this.slowQueryResult = results[1];
                    },
                    error: error => this.errorMessage = error
                }
            );
    }

    fastQuery(): void {
        this.resetFields();

        this.httpService.runFastQuery()
            .subscribe({
                    next: results => this.fastQueryResult = results,
                    error: error => this.errorMessage = error
                }
            );
    }

    slowQuery(): void {
        this.resetFields();

        this.httpService.runSlowQuery()
            .subscribe({
                    next: results => this.slowQueryResult = results,
                    error: error => this.errorMessage = error
                }
            );
    }

    reactiveQuery(): void {
        this.resetFields();

        this.httpService.runReactiveQuery()
            .subscribe({
                    next: results => this.slowQueryResult = results,
                    error: error => this.errorMessage = error
                }
            );
    }

    forceSpinner(): void {
        this.resetFields();
        this.spinner.show();
        this.httpService.runSlowQuery().subscribe({
                next: () => this.spinner.hide(),
                error: () => this.spinner.hide()
            }
        );
    }
}

