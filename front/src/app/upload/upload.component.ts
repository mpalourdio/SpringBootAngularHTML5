import { Component, Input, OnInit } from '@angular/core';
import { FileItem } from './file-item';
import { UploadService } from './upload.service';
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
    dragAndDrop: boolean;

    @Input()
    id: string;

    @Input()
    name: string;

    @Input()
    dropZoneText = 'Drop files here';

    @Input()
    url: string;

    @Input()
    accept: string;

    @Input()
    chooseButtonLabel = 'Choose files';

    @Input()
    uploadButtonLabel = 'Upload';

    errors: Response[];

    constructor(private uploadService: UploadService) {
    }

    ngOnInit() {
    }

    onFileChange(event: EventTarget): void {
        const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        this.populateFileItemList(target.files);
        target.value = null; // reset hidden file input values
    }

    upload(): void {
        this.resetComponentStateBeforeUpload();
        if (this.fileItemList.length > 0) {
            this.fileItemList.forEach(fileItem => {
                this.uploadService.doUpload(this.url, fileItem).subscribe(
                    f => {
                        this.removeFileItemFromList(f);
                        if (!this.downloadLinkVisible) {
                            this.downloadLinkVisible = true;
                        }
                    },
                    error => this.errors.push(error)
                );
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

    private populateFileItemList(fileList: FileList): void {
        Array.from(fileList).forEach(file => {
            const fileItem: FileItem = new FileItem();
            fileItem.file = file;
            fileItem.name = file.name;

            const fileExtension = this.getFileExtension(fileItem.name);
            if (this.isFileExtensionValid(fileExtension)) {
                this.fileItemList.push(fileItem);
            }
        });
    }

    removeFileItemFromList(fileItem: FileItem): void {
        if (this.fileItemList.indexOf(fileItem) >= 0) {
            this.fileItemList.splice(this.fileItemList.indexOf(fileItem), 1);
        }
    }

    private getFileExtension(filename: string) {
        return '.' + filename.split('.').pop();
    }

    private isFileExtensionValid(fileExtension: string) {
        return !!fileExtension && fileExtension === this.accept;
    }


    private resetComponentStateBeforeUpload() {
        this.errors = [];
        this.downloadLinkVisible = false;
    }
}
