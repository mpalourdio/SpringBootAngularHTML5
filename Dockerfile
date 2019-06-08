FROM adoptopenjdk/openjdk11:alpine-slim
RUN apk update && apk upgrade && apk add bash
RUN adduser -D -s /bin/bash user
WORKDIR /home/user
COPY target/springbootangularhtml5.jar app.jar
RUN chown user:user app.jar
USER user
ENTRYPOINT ["./app.jar"]
