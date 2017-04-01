import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
    selector: 'app-second',
    templateUrl: './second.component.html',
    styleUrls: ['./second.component.css'],
    providers: [HttpServiceService]
})
export class SecondComponent {
    results: String[];

    constructor(private httpService: HttpServiceService) {
    }

    callServices() {
        this.httpService.runQuery().then(
            items => this.results = items
        );
    }
}
