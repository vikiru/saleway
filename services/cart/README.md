# Cart Service

Shopping cart management service built with [Express.js](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/), and [Prisma ORM](https://www.prisma.io/).

## Features

- Cart CRUD operations and session tracking
- Item quantity updates and deletions
- State synchronization with client-side Zustand store
- Token validation via [Clerk](https://clerk.com/)

## Tech Stack

- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database & ORM**: [PostgreSQL](https://www.postgresql.org/), [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linter & Formatter**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment variables:

```bash
cp .env.sample .env
```

3. Set up the required Clerk credentials:

   - Create a [Clerk account](https://clerk.com/) and application to obtain your Clerk secret key and issuer URL.

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Generate Prisma client:

```bash
pnpm generate
```

6. Start development server:

```bash
pnpm dev
```

## Environment Variables

```bash
NODE_ENV=development
PORT=8080
# Replace with your database credentials
DATABASE_URL='postgresql://cart_user:<password>@localhost:5432/cart_db'

# Frontend CORS
FRONTEND_URL='http://localhost:3000'

# Clerk Authentication
CLERK_SECRET_KEY='sk_test_...'
```

## API Endpoints

- `GET /api/v1/health` - Health check probe
- `GET /api/v1/cart/user/{userId}` - Get user cart
- `POST /api/v1/cart/user/{userId}` - Create cart
- `POST /api/v1/cart/user/{userId}/item` - Add item to cart
- `POST /api/v1/cart/user/{userId}/sync` - Sync cart items
- `PUT /api/v1/cart/user/{userId}/item/{cartItemId}` - Update item quantity
- `DELETE /api/v1/cart/user/{userId}/item/{cartItemId}` - Remove item from cart
- `DELETE /api/v1/cart/user/{userId}` - Clear cart

The service runs on port `8080` by default.

## Available Scripts

- `pnpm dev` - Start development server with nodemon
- `pnpm start` - Start production server with tsx
- `pnpm build` - Compile TypeScript
- `pnpm lint` - Lint files with Oxlint
- `pnpm format` - Format files with Oxfmt
- `pnpm typecheck` - Run TypeScript type checks
- `pnpm generate` - Generate Prisma client
- `pnpm studio` - Open Prisma Studio
- `pnpm unused` - Check unused dependencies with Knip
