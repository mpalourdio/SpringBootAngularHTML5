import { inject, TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';
import { HttpClientModule } from '@angular/common/http';

describe('UploadService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [UploadService,]
        });
    });

    it('should be created', inject([UploadService], (service: UploadService) => {
        expect(service).toBeTruthy();
    }));
});
