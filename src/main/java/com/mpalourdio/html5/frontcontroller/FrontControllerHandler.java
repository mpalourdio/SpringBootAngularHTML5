/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package com.mpalourdio.html5.frontcontroller;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.resource.TransformedResource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Service
public class FrontControllerHandler {

    private static final String BASE_HREF_PLACEHOLDER = "#base-href#";
    private static final String FRONT_CONTROLLER_ENCODING = StandardCharsets.UTF_8.name();
    public static final String URL_SEPARATOR = "/";
    public static final String FRONT_CONTROLLER = "index.html";

    private final ServerProperties serverProperties;

    public FrontControllerHandler(ServerProperties serverProperties) {
        this.serverProperties = serverProperties;
    }

    public TransformedResource buildFrontControllerResource(Resource resource) {
        Objects.requireNonNull(resource, "resource cannot be null");

        try {
            String frontControllerContent = IOUtils.toString(resource.getInputStream(), FRONT_CONTROLLER_ENCODING);
            if (!frontControllerContent.contains(BASE_HREF_PLACEHOLDER)) {
                throw new FrontControllerException(FRONT_CONTROLLER + " does not contain " + BASE_HREF_PLACEHOLDER);
            }

            frontControllerContent = frontControllerContent.replace(BASE_HREF_PLACEHOLDER, buildBaseHref());
            return new TransformedResource(resource, frontControllerContent.getBytes(FRONT_CONTROLLER_ENCODING));
        } catch (IOException e) {
            throw new FrontControllerException("Unable to perform " + FRONT_CONTROLLER + " tranformation", e);
        }
    }

    private String buildBaseHref() {
        String contextPath = StringUtils.stripToNull(serverProperties.getServlet().getContextPath());

        return contextPath == null || contextPath.equals(URL_SEPARATOR)
                ? URL_SEPARATOR
                : contextPath + URL_SEPARATOR;
    }
}
