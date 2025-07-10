FROM openjdk:17-jdk-alpine

WORKDIR /app

# Mavenをインストール
RUN apk add --no-cache maven

# Copy Maven files first for better caching
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Create a non-root user
RUN addgroup -g 1001 -S spring && \
    adduser -u 1001 -S spring -G spring

# Change ownership of the app directory
RUN chown -R spring:spring /app
USER spring

EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
