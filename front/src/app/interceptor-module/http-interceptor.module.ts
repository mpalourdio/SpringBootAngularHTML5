/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpInterceptorServiceFactoryProvider } from './http-interceptor.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
    declarations: [
        SpinnerComponent,
        RedirectComponent
    ],
    imports: [
        CommonModule,
        HttpModule
    ],
    exports: [
        SpinnerComponent,
        RedirectComponent,
    ],
    providers: [
        HttpInterceptorServiceFactoryProvider,
    ]
})
export class HttpInterceptorModule {
}
