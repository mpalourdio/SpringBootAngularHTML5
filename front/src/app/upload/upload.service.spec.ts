import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { UploadService } from './upload.service';

describe('UploadService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UploadService,]
        });
    });

    it('should be created', inject([UploadService], (service: UploadService) => {
        expect(service).toBeTruthy();
    }));
});
