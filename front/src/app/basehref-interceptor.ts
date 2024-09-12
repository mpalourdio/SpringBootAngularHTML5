import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import { Observable } from "rxjs";

export function basehrefInterceptor$(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const baseHref = inject(APP_BASE_HREF);
    if (!req.url.toLocaleLowerCase().startsWith('http')) {
        const clonedReq = req.clone({ url: baseHref + req.url });
        return next(clonedReq);
    }

    return next(req);
}


