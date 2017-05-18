import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FileItem } from './file-item';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

    downloadLinkVisible: boolean;
    fileItemList: FileItem[] = [];

    @Input()
    multiple: boolean;

    @Input()
    name: string;

    @Input()
    url: string;

    constructor(private http: Http) {
    }

    ngOnInit() {
    }

    onFileChange(event: EventTarget): void {
        this.downloadLinkVisible = false;
        const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        this.populateFileItemList(target.files);
        target.value = null; // reset hidden file input values
    }

    upload(): void {
        if (this.fileItemList.length > 0) {
            this.fileItemList.forEach(fileItem => {
                this.doUpload(fileItem).subscribe((f: FileItem) => {
                    this.removeFileItemFromList(f);
                });
            });
        }
    }

    onDragenter(event: any): void {
        this.preventAndStop(event);
    }

    onDragleave(event: any): void {
        this.preventAndStop(event);

    }

    onDragover(event: any): void {
        this.preventAndStop(event);

    }

    onDrop(event: any): void {
        const fileList: FileList = this.getTransfer(event);
        this.populateFileItemList(fileList);
        this.preventAndStop(event);
    }

    private getTransfer(event: any): FileList {
        if (!!event.dataTransfer) {
            return event.dataTransfer.files;
        }
    }

    private preventAndStop(event: any): void {
        event.preventDefault();
        event.stopPropagation();
    }

    private doUpload(fileItem: FileItem): Observable<FileItem> {
        const formData = new FormData();
        formData.append('files', fileItem.file);

        return this.http.post(this.url, formData)
            .do(() => this.downloadLinkVisible = true)
            .map(r => fileItem);

    }

    private populateFileItemList(fileList: FileList): void {
        Array.from(fileList).forEach(file => {
            const fileItem: FileItem = new FileItem();
            fileItem.file = file;
            fileItem.name = file.name;
            this.fileItemList.push(fileItem);
        });
    }

    removeFileItemFromList(fileItem: FileItem): void {
        if (this.fileItemList.indexOf(fileItem) >= 0) {
            this.fileItemList.splice(this.fileItemList.indexOf(fileItem), 1);
        }
    }
}
