import { TestBed, inject } from '@angular/core/testing';

import { HttpServiceService } from './http-service.service';
import { HttpModule } from '@angular/http';

describe('HttpServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpServiceService],
            imports: [HttpModule],
        });
    });

    it('should ...', inject([HttpServiceService], (service: HttpServiceService) => {
        expect(service).toBeTruthy();
    }));
});
