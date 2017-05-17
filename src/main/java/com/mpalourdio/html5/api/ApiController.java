/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package com.mpalourdio.html5.api;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class ApiController {

    private byte[] inputStream;
    private String fileName;
    private String contentType;

    @GetMapping(path = "/service1")
    public ResponseEntity<List<String>> consumeMePlease() {
        final List<String> results = new ArrayList<>();
        results.add("Hey, I am a response from ApiController");

        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @GetMapping(path = "/slowservice")
    public ResponseEntity<List<String>> slowService() throws InterruptedException {
        final List<String> results = new ArrayList<>();
        results.add("Hey, I am the slow response");
        Thread.sleep(3000);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public void handleFileUpload(@RequestParam("files") final List<MultipartFile> files) throws IOException {
        //VERY ugly, make things stateful...Just for quick tests
        inputStream = IOUtils.toByteArray(files.get(0).getInputStream());
        contentType = files.get(0).getContentType();
        fileName = files.get(0).getOriginalFilename();
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> download() throws IOException {
        final HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentDispositionFormData("attachment", fileName);
        responseHeaders.set("Content-Type", contentType);

        return new ResponseEntity<>(inputStream, responseHeaders, HttpStatus.OK);
    }
}
