/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnChanges {

    @Input()
    application: string;
    applicationsList: string[] = ['office', 'vsstudio', 'mega'];
    private buffer: string[];

    constructor() {
        this.buffer = this.applicationsList;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.application.firstChange) {
            return;
        }

        this.applicationsList = this.buffer.filter(a => {
            return a.includes(changes.application.currentValue);
        });
    }
}
