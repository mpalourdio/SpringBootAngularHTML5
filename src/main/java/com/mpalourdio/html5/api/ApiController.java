/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package com.mpalourdio.html5.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class ApiController {

    private final WebClient webClient;

    public ApiController(
            @Value("${server.port}") String serverPort,
            @Value("${server.servlet.context-path}") String contexPath
    ) {
        webClient = WebClient.create("http://localhost:" + serverPort + contexPath + "/api");
    }

    @PostMapping(path = "/fast")
    public ResponseEntity<List<String>> fast() {
        List<String> results = new ArrayList<>();
        results.add("Hey, I am the fast response");

        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "x-requested-with")
    @GetMapping(path = "/slow-but-reactive")
    public Mono<List> get() {

        return webClient
                .get()
                .uri("/slow")
                .retrieve()
                .bodyToMono(List.class);
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
