import { Injectable } from '@angular/core';
import { HttpInterceptorService } from 'ng-http-loader/http-interceptor.service';
import { FileItem } from './file-item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

    constructor(private http: HttpInterceptorService) {
    }

    doUpload(url: string, fileItem: FileItem): Observable<FileItem> {
        const formData = new FormData();
        formData.append('files', fileItem.file);

        return this.http.post(url, formData)
            .map(r => fileItem)
            .catch(this.handleError);
    }


    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
