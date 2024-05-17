# Use the official Maven image as a parent image
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .

# Download dependencies
RUN mvn -B dependency:go-offline

# Copy the application code
COPY src ./src

# Build the application
RUN mvn -B package -DskipTests

FROM eclipse-temurin:21-jre-alpine AS final

ARG SPRING_PROFILE=dev

ENV SPRING_PROFILES_ACTIVE=$SPRING_PROFILE

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build stage to the container
COPY --from=build /app/target/*.jar app.jar

# Expose the port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
