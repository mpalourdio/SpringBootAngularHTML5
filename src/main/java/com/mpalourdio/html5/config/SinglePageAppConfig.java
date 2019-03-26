/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package com.mpalourdio.html5.config;

import com.mpalourdio.html5.frontcontroller.FrontControllerHandler;
import lombok.extern.slf4j.Slf4j;
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

import static com.mpalourdio.html5.frontcontroller.FrontControllerHandler.FRONT_CONTROLLER;
import static com.mpalourdio.html5.frontcontroller.FrontControllerHandler.URL_SEPARATOR;

@Slf4j
@Configuration
public class SinglePageAppConfig implements WebMvcConfigurer {

    public static final String IGNORED_PATH = "/api";
    private static final String PATH_PATTERNS = "/**";

    private final FrontControllerHandler frontControllerHandler;
    private final ApplicationContext applicationContext;
    private final String[] staticLocations;

    public SinglePageAppConfig(
            ResourceProperties resourceProperties,
            FrontControllerHandler frontControllerHandler,
            ApplicationContext applicationContext
    ) {
        this.frontControllerHandler = frontControllerHandler;
        this.applicationContext = applicationContext;
        this.staticLocations = resourceProperties.getStaticLocations();
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
            this.frontControllerResource = Arrays
                    .stream(staticLocations)
                    .map(path -> applicationContext.getResource(path + FRONT_CONTROLLER))
                    .filter(this::resourceExistsAndIsReadable)
                    .findFirst()
                    .map(frontControllerHandler::buildFrontControllerResource)
                    .orElseGet(() -> {
                        log.warn(FRONT_CONTROLLER + " not found. "
                                + "Ensure you have built the frontend part if you are not in dev mode.");

                        return null;
                    });
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
            Objects.requireNonNull(resource, "resource cannot be null");
            return resource.exists() && resource.isReadable();
        }
    }
}
