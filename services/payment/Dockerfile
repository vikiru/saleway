# Multi-stage production build for Payment Service (Spring Boot)
# Build stage with JDK
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

# Copy Maven wrapper and pom
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Runtime stage with JRE only
FROM eclipse-temurin:17-jre-alpine

# Create non-root user
RUN addgroup -S appgroup -g 1001 && adduser -S appuser -u 1001 -G appgroup

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder --chown=appuser:appgroup /app/target/*.jar app.jar

# Switch to non-root user
USER appuser

ENV SERVER_PORT=8081

EXPOSE 8081

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
