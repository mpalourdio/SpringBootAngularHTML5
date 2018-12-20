/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package com.mpalourdio.html5.config;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ResourceProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.TransformedResource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
public class SinglePageAppConfig implements WebMvcConfigurer {

    public static final String API_PATH = "/api";
    private static final String PATH_PATTERNS = "/**";
    private static final String FRONT_CONTROLLER = "index.html";
    private static final String BASE_HREF_PLACEHOLDER = "#base-href#";
    private static final String FRONT_CONTROLLER_ENCODING = StandardCharsets.UTF_8.name();

    private final String contextPath;
    private final ResourceProperties resourceProperties;

    public SinglePageAppConfig(
            @Value("${server.servlet.context-path}") String contextPath,
            ResourceProperties resourceProperties
    ) {
        this.contextPath = contextPath;
        this.resourceProperties = resourceProperties;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(PATH_PATTERNS)
                .addResourceLocations(resourceProperties.getStaticLocations())
                .resourceChain(true)
                .addResolver(new SinglePageAppResourceResolver());
    }

    private class SinglePageAppResourceResolver extends PathResourceResolver {

        private static final String URL_SEPARATOR = "/";

        private TransformedResource transformedResource(Resource resource) throws IOException {
            String fileContent = IOUtils.toString(resource.getInputStream(), FRONT_CONTROLLER_ENCODING);
            fileContent = fileContent.replace(BASE_HREF_PLACEHOLDER, buildBaseHref());
            return new TransformedResource(resource, fileContent.getBytes());
        }

        private String buildBaseHref() {
            return contextPath + URL_SEPARATOR;
        }

        @Override
        protected Resource getResource(String resourcePath, Resource location) throws IOException {
            Resource resource = location.createRelative(resourcePath);
            if (resource.exists() && resource.isReadable()) {
                //if the asked resource is index.html, we serve it with the base-href rewritten
                if (resourcePath.contains(FRONT_CONTROLLER)) {
                    return transformedResource(resource);
                }

                return resource;
            }

            //do not serve a Resource on an reserved URI
            if ((URL_SEPARATOR + resourcePath).startsWith(API_PATH)) {
                return null;
            }

            //we have just refreshed a page, no ?
            resource = location.createRelative(FRONT_CONTROLLER);
            if (resource.exists() && resource.isReadable()) {
                return transformedResource(resource);
            }

            return null;
        }
    }
}
