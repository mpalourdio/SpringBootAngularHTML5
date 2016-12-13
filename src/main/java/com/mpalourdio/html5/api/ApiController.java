/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package com.mpalourdio.html5.api;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping(path = "/api")
public class ApiController {

    @GetMapping(path = "/service1")
    public ResponseEntity<List<String>> consumeMePlease() {
        final List<String> results = new ArrayList<>();
        results.add("Hey, I am a response from ApiController");

        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @GetMapping(path = "/customheader")
    public ResponseEntity<List<String>> iSendACustomHeader() {
        final HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("custom-header", "1");

        return new ResponseEntity<>(httpHeaders, HttpStatus.OK);
    }
}
