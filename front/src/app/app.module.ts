import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { SecondComponent } from './second/second.component';
import { FirstComponent } from './first/first.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpInterceptorService, HttpInterceptorServiceFactory } from './http-interceptor.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
    declarations: [
        AppComponent,
        FirstComponent,
        SecondComponent,
        SpinnerComponent,
        RedirectComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: HttpInterceptorService,
            useFactory: HttpInterceptorServiceFactory,
            deps: [XHRBackend, RequestOptions]
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
