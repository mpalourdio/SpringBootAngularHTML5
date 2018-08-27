/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpService } from '../../../http.service';
import { UploadComponent } from '../../../second/components/upload/upload.component';
import { UploadService } from '../../../second/components/upload/upload.service';
import { ChildComponent } from '../child/child.component';
import { FirstComponent } from './first.component';

describe('FirstComponent', () => {
    let component: FirstComponent;
    let fixture: ComponentFixture<FirstComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FirstComponent, UploadComponent, ChildComponent],
            imports: [HttpClientTestingModule, FormsModule],
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


    it('should filter the array of the child element', fakeAsync(() => {
        const childValue = 'm';
        dispatchInputEventOnElement('#searchField', childValue);

        const tableCell = fixture
            .debugElement
            .query(By.css('#mytable'))
            .nativeElement;
        console.log(tableCell.rows[0].cells[0].innerHTML);

        expect(tableCell.rows[0].cells[0].innerHTML).toBe('mega');
    }));

    function dispatchInputEventOnElement(selector: string, value: string) {

        const input = fixture.debugElement.query(By.css(selector)).nativeElement;
        input.value = value;

        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        tick();
    }
});
