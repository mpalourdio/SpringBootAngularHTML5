import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppBaseHrefWithoutStaticProvider } from "./factory/app-base-href-without-static-provider.factory";
import { basehrefInterceptor$ } from "./basehref-interceptor";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { pendingRequestsInterceptor$ } from "ng-http-loader";

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        AppBaseHrefWithoutStaticProvider,
        provideHttpClient(
            withInterceptors([basehrefInterceptor$, pendingRequestsInterceptor$])
        ),
    ]
};
