import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppBaseHrefWithoutStaticProvider } from "./factory/app-base-href-without-static-provider.factory";
import { basehrefInterceptor } from "./basehref-interceptor";
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { NgHttpLoaderModule } from "ng-http-loader";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        AppBaseHrefWithoutStaticProvider,
        importProvidersFrom(NgHttpLoaderModule.forRoot()),
        provideHttpClient(
            withInterceptorsFromDi(),
            withInterceptors([basehrefInterceptor])
        ),
    ]
};
