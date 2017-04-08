import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RedirectComponent } from './redirect.component';
import { HttpInterceptorServiceFactoryProvider } from '../http-interceptor.service';
import { HttpModule } from '@angular/http';


describe('RedirectComponent', () => {
    let component: RedirectComponent;
    let fixture: ComponentFixture<RedirectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RedirectComponent],
            providers: [HttpInterceptorServiceFactoryProvider],
            imports: [HttpModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RedirectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
