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
1. Install Java 17+ and Maven
2. Set environment variables (see below)
3. Build the application: `./mvnw clean compile`
4. Start development server: `./mvnw spring-boot:run`

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
stripe.api.key=sk_test_your_test_key_here
stripe.test.mode=true
cors.allowed.origins=http://localhost:3000
```

## API Endpoints

- `POST /api/checkout/create-session` - Create Stripe checkout session
- `GET /api/refund/verify?sessionId={id}` - Verify session for refund
- `POST /api/refund/process` - Process refund
- `GET /health` - Health check

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

The service will start on port 8083 by default.
