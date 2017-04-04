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
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.TransformedResource;

import java.io.IOException;

@Configuration
public class SinglePageAppConfig extends WebMvcConfigurerAdapter {

    private final String apiPath;
    private final String contextPath;
    private final ResourceProperties resourceProperties;

    public SinglePageAppConfig(
            @Value("${apiPath}") final String apiPath,
            @Value("${server.contextPath}") final String contextPath,
            final ResourceProperties resourceProperties
    ) {
        this.apiPath = apiPath;
        this.contextPath = contextPath;
        this.resourceProperties = resourceProperties;
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations(resourceProperties.getStaticLocations())
                .setCachePeriod(resourceProperties.getCachePeriod())
                .resourceChain(true)
                .addResolver(new SinglePageAppResourceResolver());
    }

    private class SinglePageAppResourceResolver extends PathResourceResolver {

        @Override
        protected Resource getResource(final String resourcePath, final Resource location) throws IOException {
            Resource resource = location.createRelative(resourcePath);
            if (resource.exists() && resource.isReadable()) {
                return resource;
            }

            if (apiPath != null && ("/" + resourcePath).startsWith(apiPath)) {
                return null;
            }

            resource = location.createRelative("index.html");
            if (resource.exists() && resource.isReadable()) {
                String html = IOUtils.toString(resource.getInputStream(), "UTF-8");
                html = html.replace("#context-path#", contextPath + "/");
                return new TransformedResource(resource, html.getBytes());
            }

            return null;
        }
    }
}
