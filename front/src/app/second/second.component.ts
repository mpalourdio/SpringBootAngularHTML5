import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-second',
    templateUrl: './second.component.html',
    styleUrls: ['./second.component.css'],
    providers: [HttpServiceService]
})
export class SecondComponent {
    successQueryResults: String[];
    slowQueryResults: String[];
    errorMessage: any;

    constructor(private httpService: HttpServiceService) {
    }

    callServices() {
        this.successQueryResults = [];
        this.slowQueryResults = [];
        this.errorMessage = [];

        Observable.forkJoin([
            this.httpService.runSuccessQuery(),
            this.httpService.runSlowQuery()
        ])
            .subscribe(
                results => {
                    console.log(results);
                    this.successQueryResults = results[0];
                    this.slowQueryResults = results[1];
                },
                error => this.errorMessage = <any>error
            );
    }
}

