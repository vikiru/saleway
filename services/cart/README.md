# Cart Service

Node.js/TypeScript shopping cart management service.

## Features
- Cart CRUD operations
- Item quantity management
- Session-based cart tracking
- Prisma ORM integration

## Tech Stack
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma
- **Package Manager**: pnpm

## Setup

```bash
# Install dependencies
pnpm install

# Set environment variables
# Edit .env with your database credentials
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start service
pnpm run dev
```

## Environment Variables

```bash
# Replace these with your database username, password, host, port, and database name.
DATABASE_URL='postgresql://<username>:<password>@<host>:<port>/<database name>'

# Frontend CORS
FRONTEND_URL='http://localhost:3000'

# Clerk Authentication
CLERK_SECRET_KEY='sk_test_...'
```

## API Endpoints

- `GET /api/v1/health` - Health check
- `GET /api/v1/cart/user/{userId}` - Get user's cart
- `POST /api/v1/cart/user/{userId}` - Create new cart
- `POST /api/v1/cart/user/{userId}/item` - Add item to cart
- `POST /api/v1/cart/user/{userId}/sync` - Sync cart
- `PUT /api/v1/cart/user/{userId}/item/{cartItemId}` - Update item quantity
- `DELETE /api/v1/cart/user/{userId}/item/{cartItemId}` - Remove item from cart
- `DELETE /api/v1/cart/user/{userId}` - Clear cart

The service will start on port 8080 by default.

## Development

```bash
# Format code
pnpm run format

# Lint code
pnpm run lint
```
