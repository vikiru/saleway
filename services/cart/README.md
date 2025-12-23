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
NODE_ENV='development'
PORT=3000
# Replace these with your database username, password, host, port, and database name.
DATABASE_URL='postgresql://<username>:<password>@<host>:<port>/<database name>'
```

## API Endpoints

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Create new cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/{itemId}` - Update item quantity
- `DELETE /api/cart/items/{itemId}` - Remove item from cart
- `DELETE /api/cart` - Clear cart

The service will start on port 3000 by default.

## Development

```bash
# Run tests
pnpm test

# Format code
pnpm run format

# Lint code
pnpm run lint
```
