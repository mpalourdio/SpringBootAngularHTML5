import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpServiceService {

    constructor(private http: Http) {
    }

    runSuccessQuery(): Observable<String[]> {
        return this.http.get('api/service1')
            .map(this.extractData)
            .catch(this.handleError);
    }

    runCustomHeadersQuery(): Observable<String[]> {
        return this.http.get('api/customheader')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json() || {};
    }

    private handleError(error: Response | any) {
        return Promise.reject(error);
    }

}
