/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
