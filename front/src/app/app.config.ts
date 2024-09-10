import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppBaseHrefWithoutStaticProvider } from "./factory/app-base-href-without-static-provider.factory";
import { BasehrefInterceptorProvider } from "./basehref-interceptor.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgHttpLoaderModule } from "ng-http-loader";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        AppBaseHrefWithoutStaticProvider,
        BasehrefInterceptorProvider,
        importProvidersFrom(NgHttpLoaderModule.forRoot()),
        provideHttpClient(withInterceptorsFromDi()),
    ]
};
