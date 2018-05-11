import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileItem } from './file-item';

@Injectable()
export class UploadService {

    constructor(private http: HttpClient) {
    }

    doUpload(url: string, fileItem: FileItem): Observable<FileItem> {
        const formData = new FormData();
        formData.append('files', fileItem.file);

        return this.http.post<FileItem>(url, formData)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: Response | any): Observable<never> {
        return throwError(error);
    }
}
