/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { FactoryProvider } from '@angular/core';

export const AppBaseHrefWithoutStaticProvider: FactoryProvider = {
    provide: APP_BASE_HREF,
    useFactory: (platformLocation: PlatformLocation) => {
        return platformLocation
            .getBaseHrefFromDOM()
            .replace('static/', '');
    },
    deps: [PlatformLocation]
};

