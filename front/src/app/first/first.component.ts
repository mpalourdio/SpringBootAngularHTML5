/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-first',
    templateUrl: './first.component.html',
    styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
    datalist: string[] = [];
    datalistselection: string;

    constructor(private http: HttpService) {
    }

    ngOnInit(): void {
        this.http.datalist().subscribe(
            d => this.datalist = d
        );
    }

    datalistSelectionChange(event: string) {
        this.datalistselection = event;
    }

    isInList() {
        if (!!this.datalistselection) {
            const inList = this.datalist.some((a: any) => {
                return a.name === this.datalistselection;
            });

            this.datalistselection = inList ? this.datalistselection : null;
        }
    }
}
