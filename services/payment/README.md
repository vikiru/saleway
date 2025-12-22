# Payment Service

Stripe payment processing service for the e-commerce platform.

## Configuration

Set the following properties in your `src/main/resources/application.properties` file:

```properties
stripe.api.key=sk_test_your_test_key_here
stripe.test.mode=true
cors.allowed.origins=http://localhost:3000
```

## API Endpoints

All success/error responses follow the `ApiResponse` wrapper structure.

### Create Checkout Session
- **POST** `/api/checkout/create-session`
- **Body**:
  ```json
  {
    "lineItems": [
      {
        "name": "Apex Pro Ultra",
        "description": "High-performance sneakers",
        "unitAmount": 8000, // amount in cents
        "currency": "cad",
        "quantity": 1,
        "image": "Some image url here"
      }
    ],
    "successUrl": "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    "cancelUrl": "http://localhost:3000/cart",
    "customerEmail": "customer@example.com",
    "metadata": { "orderId": "ORD-123" }
  }
  ```
- **Returns**: `sessionId` and `url` for redirect.

### Verify Session (Refund Step 1)
- **GET** `/api/refund/verify?sessionId=cs_test_abc`
- **Returns**: Validates session and retrieves `paymentIntentId`.

### Process Refund (Refund Step 2)
- **POST** `/api/refund/process`
- **Body**:
  ```json
  {
    "paymentIntentId": "pi_123...",
    "amount": 12000,
    "reason": "order_creation_failed"
  }
  ```

### Health Check
- **GET** `/health`
- **Returns**: `{ "status": "UP", "message": "Payment service is up and running" }`

## Test Cards

- **Successful payment**: `4242 4242 4242 4242`
- **Card declined**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`
- **Expired card**: `4000 0000 0000 0069`

## Development Scripts

Use the following commands with the Maven wrapper:

- **Run Service**: `./mvnw spring-boot:run`
- **Format Code**: `./mvnw fmt:format` (Uses Google Java Format)
- **Build/Compile**: `./mvnw clean compile`
- **Generate IDE Files**: `./mvnw eclipse:eclipse` (Generates Eclipse project files for IDEs/editors)

The service will start on port 8083 by default.
