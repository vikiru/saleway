# Rating Service

Product rating and review management service built with [Django](https://www.djangoproject.com/) and [Django Ninja](https://django-ninja.dev/).

## Features

- Product rating and review submissions
- Dynamic average rating calculations
- User review retrieval and moderation
- OpenAPI-compliant API routing via Django Ninja

## Tech Stack

- **Framework**: [Django](https://www.djangoproject.com/) 6.0
- **API Framework**: [Django Ninja](https://django-ninja.dev/)
- **Language**: [Python](https://www.python.org/) 3.13
- **Database**: [PostgreSQL](https://www.postgresql.org/) with Django ORM
- **Package & Task Runner**: [uv](https://docs.astral.sh/uv/), [poethepoet](https://github.com/nat-n/poethepoet)
- **Linter & Formatter**: [Ruff](https://docs.astral.sh/ruff/)

## Setup

1. Install dependencies:

```bash
uv sync
```

2. Configure environment variables:

```bash
cp .env.sample .env
```

3. Set up the required Clerk credentials:

   - Create a [Clerk account](https://clerk.com/) and application to obtain your Clerk issuer URL for JWT authentication.

4. Apply database migrations:

```bash
uv run poe migrate
```

5. Start development server:

```bash
uv run poe dev
```

## Environment Variables

```bash
# Replace with your database credentials
DATABASE_URL='postgresql://rating_user:<password>@localhost:5432/rating_db'

# Frontend CORS
CORS_ALLOWED_ORIGINS='http://localhost:3000'

# Clerk Authentication
CLERK_ISSUER_URL='https://clerk.your-tenant.com'
```

## API Endpoints

- `GET /api/v1/health` - Health check probe
- `GET /api/v1/products/{product_id}/rating` - Get product average rating
- `GET /api/v1/products/{product_id}/reviews` - Get product reviews
- `POST /api/v1/products/{product_id}/reviews` - Create product review
- `GET /api/v1/products/{product_id}/reviews/{review_id}` - Get review by ID
- `PUT /api/v1/products/{product_id}/reviews/{review_id}` - Update review
- `DELETE /api/v1/products/{product_id}/reviews/{review_id}` - Delete review
- `GET /api/v1/reviews/user/{user_id}` - Get reviews by user ID

The service runs on port `8001` by default.

## Available Scripts

- `uv run poe dev` - Start development server with hot reload
- `uv run poe start` - Start production server with Gunicorn
- `uv run poe migrate` - Apply Django database migrations
- `uv run poe create-migrations` - Create new Django migrations
- `uv run poe lint` - Lint and fix code with Ruff
- `uv run poe format` - Format code with Ruff
- `uv run poe typecheck` - Run type checks with basedpyright
