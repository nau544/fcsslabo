FROM openjdk:17-jdk-alpine

WORKDIR /app

# 必要なパッケージをインストール
RUN apk add --no-cache maven bash

# Copy Maven files first for better caching
COPY pom.xml .

# Download dependencies using system Maven
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application using system Maven
RUN mvn clean package -DskipTests

# Create a non-root user
RUN addgroup -g 1001 -S spring && \
    adduser -u 1001 -S spring -G spring

# Change ownership of the app directory
RUN chown -R spring:spring /app
USER spring

# 正しいポートを公開
EXPOSE 8081

# Run the application
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
