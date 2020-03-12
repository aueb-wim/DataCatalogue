FROM openjdk:8-alpine as builder
WORKDIR /app
COPY . /app
ADD target/datacatalogbackend-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=container", "-jar", "/app/app.jar"]
#COPY --from=builder /app/build/libs/*.jar /app/app.jar


#FROM openjdk:8-jdk-alpine
#VOLUME /tmp
#EXPOSE 8086
#RUN mkdir -p /app/
#RUN mkdir -p /app/logs/
#ADD target/datacatalogbackend-0.0.1-SNAPSHOT.jar /app/app.jar
#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=container", "-jar", "/app/app.jar"]
