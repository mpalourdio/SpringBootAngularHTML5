/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondComponent } from './second.component';
import { HttpModule } from '@angular/http';
import { HttpInterceptorServiceFactoryProvider } from 'ng-http-loader/http-interceptor.service';
import { HttpService } from '../http.service';

describe('SecondComponent', () => {
    let component: SecondComponent;
    let fixture: ComponentFixture<SecondComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SecondComponent],
            providers: [HttpService, HttpInterceptorServiceFactoryProvider],
            imports: [HttpModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SecondComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create a component instance', () => {
        expect(component).toBeTruthy();
    });
});
