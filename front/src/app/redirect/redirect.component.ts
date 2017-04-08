import { Component, OnDestroy } from '@angular/core';
import { HttpInterceptorService } from '../http-interceptor.service';

@Component({
    selector: 'app-redirect',
    template: '',
    styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnDestroy {
    private subscription: any;

    constructor(private http: HttpInterceptorService) {
        this.subscription = this.http
            .getCustomHeaderPresenceSubject()
            .subscribe(() => {
                this.redirect();
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private redirect() {
        console.log('custom header detected');
        window.location.href = 'http://redirect.me'; //feels dirty...
    }
}
