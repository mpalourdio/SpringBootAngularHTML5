/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package com.mpalourdio.html5.config;

import com.mpalourdio.html5.frontcontroller.FrontControllerException;
import com.mpalourdio.html5.frontcontroller.FrontControllerUtils;
import org.springframework.boot.autoconfigure.web.ResourceProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;

import static com.mpalourdio.html5.frontcontroller.FrontControllerUtils.URL_SEPARATOR;

@Configuration
public class SinglePageAppConfig implements WebMvcConfigurer {

    public static final String IGNORED_PATH = "/api";
    private static final String PATH_PATTERNS = "/**";
    private static final String FRONT_CONTROLLER = "index.html";

    private final FrontControllerUtils frontControllerUtils;
    private final ApplicationContext applicationContext;
    private final String[] staticLocations;

    public SinglePageAppConfig(
            ResourceProperties resourceProperties,
            FrontControllerUtils frontControllerUtils,
            ApplicationContext applicationContext
    ) {
        this.frontControllerUtils = frontControllerUtils;
        this.applicationContext = applicationContext;
        staticLocations = resourceProperties.getStaticLocations();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(PATH_PATTERNS)
                .addResourceLocations(staticLocations)
                .resourceChain(true)
                .addResolver(new SinglePageAppResourceResolver());
    }

    private class SinglePageAppResourceResolver extends PathResourceResolver {

        private final Resource frontControllerResource;

        SinglePageAppResourceResolver() {
            frontControllerResource = Arrays
                    .stream(staticLocations)
                    .map(path -> {
                        Resource resource = applicationContext.getResource(path + FRONT_CONTROLLER);
                        Resource indexHtmlResource = null;
                        if (resourceExistsAndIsReadable(resource)) {
                            try {
                                indexHtmlResource = frontControllerUtils.buildFrontControllerResource(resource);
                            } catch (IOException e) {
                                throw new FrontControllerException("Unable to perform index.html tranformation", e);
                            }
                        }

                        return indexHtmlResource;
                    })
                    .filter(Objects::nonNull)
                    .findFirst()
                    .orElseThrow(() -> new FrontControllerException("Unable to locate index.html"));
        }

        @Override
        protected Resource getResource(String resourcePath, Resource location) throws IOException {
            Resource resource = location.createRelative(resourcePath);
            if (resourceExistsAndIsReadable(resource)) {
                //if the asked resource is index.html itself, we serve it with the base-href rewritten
                if (resourcePath.endsWith(FRONT_CONTROLLER)) {
                    return frontControllerResource;
                }
                //here we serve js, css, etc.
                return resource;
            }

            //do not serve a Resource on an ignored path
            if ((URL_SEPARATOR + resourcePath).startsWith(IGNORED_PATH)) {
                return null;
            }

            //we are in the case of an angular route here, we rewrite to index.html
            if (resourceExistsAndIsReadable(location.createRelative(FRONT_CONTROLLER))) {
                return frontControllerResource;
            }

            return null;
        }

        private boolean resourceExistsAndIsReadable(Resource resource) {
            return resource.exists() && resource.isReadable();
        }
    }
}
