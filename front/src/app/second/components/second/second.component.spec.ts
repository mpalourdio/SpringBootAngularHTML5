/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondComponent } from './second.component';
import { provideRouter } from "@angular/router";
import { provideZonelessChangeDetection } from "@angular/core";

describe('SecondComponent', () => {
    let component: SecondComponent;
    let fixture: ComponentFixture<SecondComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SecondComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideRouter([]),
                provideZonelessChangeDetection(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SecondComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create a component instance', () => {
        expect(component).toBeTruthy();
    });
});
