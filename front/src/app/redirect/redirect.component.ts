import { Component, OnDestroy } from '@angular/core';
import { HttpInterceptorService } from '../http-interceptor.service';

@Component({
    selector: 'app-redirect',
    templateUrl: './redirect.component.html',
    styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnDestroy {
    private subscription: any;
    public isModalVisible: boolean;
    public counter: number;

    constructor(private http: HttpInterceptorService) {
        this.subscription = this.http
            .getCustomHeaderPresenceSubject()
            .subscribe(() => {
                this.showModal();
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private redirect() {
        console.log('custom header detected');
        window.location.href = 'http://redirect.me'; //feels dirty...
    }

    private showModal(): void {
        this.counter = 5;
        this.isModalVisible = true;
        setInterval(() => {
            if (0 === this.counter) {
                this.redirect();
                return;
            }
            this.counter--;
        }, 1000);
    }
}
