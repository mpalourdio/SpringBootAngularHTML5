/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { FirstComponent } from './first/first.component';
import { HttpService } from './http.service';
import { SecondComponent } from './second/second.component';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';

@NgModule({
    declarations: [
        AppComponent,
        FirstComponent,
        SecondComponent,
        UploadComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule,
        AppRoutingModule,
        NgHttpLoaderModule,
    ],
    providers: [
        HttpService,
        UploadService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
