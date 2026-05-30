# Build stage
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY backend/pom.xml .
# Download dependencies first for caching
RUN mvn dependency:go-offline -B
COPY backend/src ./src
RUN mvn package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/carfind-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
