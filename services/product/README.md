# Product Service

Product catalog and discovery service built with [FastAPI](https://fastapi.tiangolo.com/), [SQLModel](https://sqlmodel.tiangolo.com/), and [Google GenAI SDK](https://ai.google.dev/gemini-api/docs).

## Features

- Product CRUD operations and catalog management
- Category and brand filtering
- AI-enriched product descriptions and metadata powered by Google Gemini
- Product image references sourced from Unsplash

## Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: [Python](https://www.python.org/) 3.13
- **Database & ORM**: [PostgreSQL](https://www.postgresql.org/), [SQLModel](https://sqlmodel.tiangolo.com/), [Alembic](https://alembic.sqlalchemy.org/)
- **AI Integration**: [Google GenAI SDK](https://ai.google.dev/gemini-api/docs) (Gemini)
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

3. Run database migrations:

```bash
uv run poe migrate
```

4. Seed sample product catalog data:

```bash
uv run poe seed
```

5. Start development server:

```bash
uv run poe dev
```

## Environment Variables

```bash
# Replace with your database credentials
DATABASE_URL='postgresql://product_user:<password>@localhost:5432/product_db'

# Google Gemini
GEMINI_API_KEY='your-gemini-api-key'
ENVIRONMENT='development'

# Frontend CORS
FRONTEND_URL='http://localhost:3000'
```

## API Endpoints

- `GET /api/v1/health` - Health check probe
- `GET /api/v1/products` - List all products
- `GET /api/v1/products/{product_id}` - Get product by ID
- `GET /api/v1/products/category/{category}` - Filter products by category
- `GET /api/v1/products/brand/{brand}` - Filter products by brand
- `GET /api/v1/products/search/{name}` - Search products by name

The service runs on port `8000` by default.

## Available Scripts

- `uv run poe dev` - Start development server with hot reload
- `uv run poe start` - Start production server with uvicorn
- `uv run poe migrate` - Run Alembic database migrations
- `uv run poe seed` - Seed database with product catalog data
- `uv run poe lint` - Lint and fix code with Ruff
- `uv run poe format` - Format code with Ruff
- `uv run poe typecheck` - Run type checks with basedpyright
