# Payment Service

Payment processing and checkout management service built with [Spring Boot](https://spring.io/projects/spring-boot) and the [Stripe Java SDK](https://github.com/stripe/stripe-java).

## Features

- Stripe Checkout session creation
- Checkout session verification
- Payment refund processing workflows
- Standardized health monitoring probe

## Tech Stack

- **Framework**: [Spring Boot](https://spring.io/projects/spring-boot)
- **Language**: [Java](https://adoptium.net/) 17+
- **Payment SDK**: [Stripe Java SDK](https://github.com/stripe/stripe-java)
- **Build Tool**: [Maven](https://maven.apache.org/)
- **Linter & Formatter**: [Checkstyle](https://checkstyle.sourceforge.io/), [Google Java Format](https://github.com/google/google-java-format)

## Setup

1. Configure application properties:

```bash
cp src/main/resources/application-sample.properties src/main/resources/application.properties
```

2. Set up the required Stripe credentials:

   - Create a [Stripe account](https://stripe.com/) to obtain your Stripe secret API key.

3. Build and compile the application:

```bash
./mvnw clean compile
```

4. Start development server:

```bash
./mvnw spring-boot:run
```

## Environment Variables

Configure `src/main/resources/application.properties`:

```properties
stripe.api.key=sk_test_your_stripe_secret_key
stripe.test.mode=true
cors.allowed.origins=http://localhost:3000
spring.datasource.url=jdbc:postgresql://localhost:5432/payment_db
spring.datasource.username=payment_user
spring.datasource.password=your_payment_password
```

## API Endpoints

- `GET /api/v1/health` - Health check probe
- `POST /api/v1/checkout/create-session` - Create Stripe checkout session
- `POST /api/v1/checkout/verify` - Verify Stripe checkout session
- `POST /api/v1/refund/process` - Process refund

The service runs on port `8081` by default.

## Available Scripts

- `./mvnw spring-boot:run` - Start development server
- `./mvnw clean compile` - Compile source code
- `./mvnw clean package` - Package into executable JAR
- `./mvnw validate` - Lint code with Checkstyle
- `./mvnw fmt:format` - Format code with Google Java Format

## Test Cards

- **Successful payment**: `4242 4242 4242 4242`
- **Card declined**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`
- **Expired card**: `4000 0000 0000 0069`
