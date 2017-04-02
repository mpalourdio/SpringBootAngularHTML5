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
    customHeaderQueryResults: String[];
    errorMessage: any;

    constructor(private httpService: HttpServiceService) {
    }

    callServices() {
        this.successQueryResults = [];
        this.customHeaderQueryResults = [];
        this.errorMessage = [];

        Observable.forkJoin([
            this.httpService.runSuccessQuery(),
            this.httpService.runCustomHeadersQuery()
        ])
            .subscribe(
                results => {
                    console.log(results);
                    this.successQueryResults = results[0];
                    this.customHeaderQueryResults = results[1];
                },
                error => this.errorMessage = <any>error
            );
    }
}

