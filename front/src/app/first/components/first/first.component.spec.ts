/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgHttpLoaderServicesModule } from 'ng-http-loader/services/ng-http-loader-services.module';
import { HttpService } from '../../../http.service';
import { UploadComponent } from '../../../second/components/upload/upload.component';
import { UploadService } from '../../../second/components/upload/upload.service';
import { FirstComponent } from './first.component';

describe('FirstComponent', () => {
    let component: FirstComponent;
    let fixture: ComponentFixture<FirstComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FirstComponent, UploadComponent],
            imports: [HttpClientTestingModule, FormsModule, NgHttpLoaderServicesModule],
            providers: [UploadService, HttpService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FirstComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create a component instance', () => {
        expect(component).toBeTruthy();
    });
});
