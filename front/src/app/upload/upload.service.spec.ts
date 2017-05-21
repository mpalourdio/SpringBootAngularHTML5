import { inject, TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';
import { HttpInterceptorServiceFactoryProvider } from 'ng-http-loader/http-interceptor.service';
import { HttpModule } from '@angular/http';

describe('UploadService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [UploadService, HttpInterceptorServiceFactoryProvider]
        });
    });

    it('should be created', inject([UploadService], (service: UploadService) => {
        expect(service).toBeTruthy();
    }));
});
