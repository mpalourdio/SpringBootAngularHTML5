import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
@Component({
    selector: 'upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

    files: FileList;
    downloadLinkVisible: boolean;

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

    fileChange(event: EventTarget): void {
        this.downloadLinkVisible = false;
        const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        this.files = target.files;
    }

    upload(): void {
        const formData = new FormData();
        Array.from(this.files).forEach(file => formData.append('files', file));

        this.http.post(this.url, formData)
            .do(() => this.downloadLinkVisible = true)
            .subscribe((data) =>  {
                console.log(data);
            });
    }
}
