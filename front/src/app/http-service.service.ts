import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpInterceptorService } from './http-interceptor.service';

@Injectable()
export class HttpServiceService {

    constructor(private http: HttpInterceptorService) {
    }

    runSuccessQuery(): Observable<String[]> {
        return this.http.get('api/service1')
            .map(this.extractData)
            .catch(this.handleError);
    }

    runCustomHeaderQuery(): Observable<String[]> {
        return this.http.get('api/customheader')
            .map(this.extractData)
            .catch(this.handleError);
    }

    runSlowQuery(): Observable<String[]> {
        return this.http.get('api/slowservice')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json() || {};
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }

}
