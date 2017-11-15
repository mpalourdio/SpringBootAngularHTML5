import { Injectable } from '@angular/core';
import { FileItem } from './file-item';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';

@Injectable()
export class UploadService {

    constructor(private http: HttpClient) {
    }

    doUpload(url: string, fileItem: FileItem): Observable<FileItem> {
        const formData = new FormData();
        formData.append('files', fileItem.file);

        return this.http.post(url, formData)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
