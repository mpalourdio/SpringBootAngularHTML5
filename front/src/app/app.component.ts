/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgHttpLoaderComponent, PendingRequestsInterceptorConfigurer } from 'ng-http-loader';
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, NgHttpLoaderComponent]
})
export class AppComponent implements OnInit, AfterViewInit {

    @ViewChild('ngHttpLoader')
    ngHttpLoader!: NgHttpLoaderComponent;

    constructor(private pendingRequestsInterceptor: PendingRequestsInterceptorConfigurer) {
    }

    ngOnInit(): void {
        this.pendingRequestsInterceptor.pendingRequestsStatus$.subscribe(pending => {
            if (!pending) {
                console.log('No HTTP requests pending anymore');
            }
        });
    }

    ngAfterViewInit(): void {
        this.ngHttpLoader.isVisible$.subscribe(v => {
            if (!v) {
                console.log('No HTTP requests pending anymore (from ngAfterViewInit)');
            }
        });
    }
}
