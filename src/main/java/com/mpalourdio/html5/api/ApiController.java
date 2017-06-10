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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class ApiController {

    private byte[] fileContent;
    private String fileName;
    private String contentType;
    private final Logger LOG = LoggerFactory.getLogger(getClass());

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
    public String handleFileUpload(@RequestParam("files") final MultipartFile files) throws IOException {
        //VERY ugly, make things stateful...Just for quick tests
        fileContent = IOUtils.toByteArray(files.getInputStream());
        contentType = files.getContentType();
        fileName = files.getOriginalFilename();

        LOG.info(fileName + " sent");

        return fileName;
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> download() throws IOException {
        final HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentDispositionFormData("attachment", fileName);
        responseHeaders.set("Content-Type", contentType);

        return new ResponseEntity<>(fileContent, responseHeaders, HttpStatus.OK);
    }

    @GetMapping(path = "/datalist")
    public List<DataListOptions> gegetOptions() {
        final List<DataListOptions> result = new LinkedList<>();

        Integer i = 0;
        while (i < 10) {
            result.add(new DataListOptions("kiwi", "option1"));
            result.add(new DataListOptions("Raspberry", "option2"));
            result.add(new DataListOptions("Cherry", "option3"));
            i++;
        }

        return result;
    }

    public static class DataListOptions {

        public String name;
        public String value;

        public DataListOptions() {
        }

        public DataListOptions(final String name, final String value) {
            this.name = name;
            this.value = value;
        }
    }
}
