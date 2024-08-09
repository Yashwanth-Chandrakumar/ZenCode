# Use an official Maven image with JDK 17 to build the Spring Boot application
FROM maven:3.9.5-eclipse-temurin-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and download the dependencies
COPY pom.xml .

# Download Maven dependencies without running the application
RUN mvn dependency:go-offline -B

# Copy the source code into the container
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Use an official Ubuntu image as a parent image for the runtime
FROM ubuntu:20.04

# Set environment variables to avoid user interaction during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages including g++, Java, C, and Python
RUN apt-get update && \
    apt-get install -y \
    g++ \
    gcc \
    openjdk-17-jdk \
    python3 \
    python3-pip \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create a directory for the application
WORKDIR /app

# Copy the packaged jar from the build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

# Expose the port on which the Spring Boot app will run
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "/app/backend.jar"]
