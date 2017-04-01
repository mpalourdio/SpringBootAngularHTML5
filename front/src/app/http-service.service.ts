import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

const url = 'api/service1';

@Injectable()
export class HttpServiceService {

    constructor(private http: Http) {
    }

    runQuery(): Promise<any[]> {
        return this.http.get(url)
            .toPromise()
            .then(this.extractData, this.handleError);
    }

    private extractData(res: Response) {
        return res.json() || {};
    }

    private handleError(error: Response | any) {
        return Promise.reject(error);
    }

}
