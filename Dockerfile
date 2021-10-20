FROM eclipse-temurin:17-alpine
RUN apk update && apk upgrade && apk add bash
RUN adduser -D -s /bin/bash user && chgrp -R 0 /home/user && chmod -R g=u /home/user
WORKDIR /home/user
COPY target/springbootangularhtml5.jar app.jar
RUN chown user:user app.jar
USER user
ENTRYPOINT ["./app.jar"]
