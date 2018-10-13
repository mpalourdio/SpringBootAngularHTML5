/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package com.mpalourdio.html5.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class ApiController {

    @PostMapping(path = "/fast")
    public ResponseEntity<List<String>> fast() {
        List<String> results = new ArrayList<>();
        results.add("Hey, I am the fast response");

        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "x-requested-with")
    @GetMapping(path = "/slow")
    public ResponseEntity<List<String>> slow() throws InterruptedException {
        Thread.sleep(3000);
        List<String> results = new ArrayList<>();
        results.add("Hey, I am the slow cross-origin response (if performed from port 4200)");

        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}
