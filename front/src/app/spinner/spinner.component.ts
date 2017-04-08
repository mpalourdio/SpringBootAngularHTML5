import { Component, OnDestroy } from '@angular/core';
import { HttpInterceptorService } from '../http-interceptor.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy {
    public isSpinnerVisible;
    private subscription: Subscription;

    constructor(private http: HttpInterceptorService) {
        this.subscription = this.http
            .getPendingRequestStatusSubject()
            .subscribe((isSpinnerVisible) => {
                this.isSpinnerVisible = isSpinnerVisible;
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
