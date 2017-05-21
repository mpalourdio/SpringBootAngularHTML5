import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import { HttpModule } from '@angular/http';
import { UploadService } from './upload.service';
import { HttpInterceptorServiceFactoryProvider } from 'ng-http-loader/http-interceptor.service';

describe('UploadComponent', () => {
    let component: UploadComponent;
    let fixture: ComponentFixture<UploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UploadComponent],
            imports: [HttpModule],
            providers: [UploadService, HttpInterceptorServiceFactoryProvider]
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
