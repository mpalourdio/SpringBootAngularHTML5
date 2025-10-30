/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component, signal } from '@angular/core';
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

    fastQueryResult = signal<string[] | object | null>(null);
    slowQueryResult = signal<string[] | object | null>(null);
    errorMessage = signal<unknown>(null);

    constructor(private httpService: HttpService, private spinner: SpinnerVisibilityService) {
    }

    private resetFields(): void {
        this.fastQueryResult.set(null);
        this.slowQueryResult.set(null);
        this.errorMessage.set(undefined);
    }

    callAllQueries(): void {
        this.resetFields();

        forkJoin([
            this.httpService.runFastQuery$(),
            this.httpService.runSlowQuery$(),
        ])
            .subscribe({
                    next: results => {
                        console.log(results);
                        this.fastQueryResult.update(() => results[0]);
                        this.slowQueryResult.update(() => results[1]);
                    },
                    error: (error: unknown) => this.errorMessage.update(() => error)
                }
            );
    }

    fastQuery(): void {
        this.resetFields();

        this.httpService.runFastQuery$()
            .subscribe({
                    next: results => this.fastQueryResult.update(() => results),
                    error: (error: unknown) => this.errorMessage.update(() => error)
                }
            );
    }

    slowQuery(): void {
        this.resetFields();

        this.httpService.runSlowQuery$()
            .subscribe({
                    next: results => this.slowQueryResult.update(() => results),
                    error: (error: unknown) => this.errorMessage.update(() => error)
                }
            );
    }

    reactiveQuery(): void {
        this.resetFields();

        this.httpService.runReactiveQuery$()
            .subscribe({
                next: results => this.slowQueryResult.update(() => results),
                error: (error: unknown) => this.errorMessage.update(() => error)
                }
            );
    }

    forceSpinner(): void {
        this.resetFields();
        this.spinner.show();
        this.httpService.runSlowQuery$().subscribe({
                next: () => this.spinner.hide(),
                error: () => this.spinner.hide()
            }
        );
    }
}

