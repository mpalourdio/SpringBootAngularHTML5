import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import { UploadService } from './upload.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UploadComponent', () => {
    let component: UploadComponent;
    let fixture: ComponentFixture<UploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UploadComponent],
            imports: [HttpClientTestingModule],
            providers: [UploadService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
