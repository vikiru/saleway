# Payment Service

Spring Boot-based payment processing service with Stripe integration.

## Features
- Stripe Checkout Sessions
- Payment processing and refunds

## Tech Stack
- **Framework**: Spring Boot
- **Payment**: Stripe Java SDK
- **Build Tool**: Maven

## Setup

### Spring Boot Service Startup Process:
1. Install Java 17+ and Maven.
2. Set environment variables (see below).
3. Build the application.
```bash
./mvnw clean compile
```
4. Start development server.
```bash
./mvnw spring-boot:run
```

```bash
# Alternative manual setup
# Install dependencies and build
./mvnw clean install

# Configure application properties
# Edit src/main/resources/application.properties with your Stripe keys

# Start the application
./mvnw spring-boot:run
```

## Environment Variables

```properties
stripe.api.key=${STRIPE_API_KEY:sk_test_...}
stripe.test.mode=${STRIPE_TEST_MODE:true}
cors.allowed.origins=${FRONTEND_URL:http://localhost:3000}
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5434/payment_service}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:postgres}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:password}
```

## API Endpoints

- `GET /api/v1/health` - Health check
- `POST /api/v1/checkout/create-session` - Create Stripe checkout session
- `POST /api/v1/checkout/verify` - Verify session
- `POST /api/v1/refund/process` - Process refund

## Development

```bash
# Run service
./mvnw spring-boot:run

# Lint code
./mvnw validate

# Format code
./mvnw fmt:format

# Build/compile
./mvnw clean compile

# Generate IDE files
./mvnw eclipse:eclipse
```

## Test Cards

- **Successful payment**: `4242 4242 4242 4242`
- **Card declined**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`
- **Expired card**: `4000 0000 0000 0069`

The service will start on port 8080 by default.
