# Product Service

FastAPI-based service for managing product information.

## Features
- Product CRUD operations
- AI-powered product information
- Images retrieved from Unsplash
- Category and brand filtering
- Search functionality

## Tech Stack
- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLModel
- **AI**: Google Gemini for product information
- **Image Service**: Unsplash for product images
- **Development Tools**: uv, Poe the Poet, Ruff

## Setup

### FastAPI Service Startup Process:
1. Activate virtual environment: `source .venv/bin/activate`
2. Install Python packages: `uv sync`
3. Create PostgreSQL database (if it doesn't exist): `poe create-db`
4. Initialize database with tables: `poe init-db`
5. Seed database with sample data: `poe seed`
6. Start development server: `poe dev` or start production server: `poe start`

```bash
# Alternative manual setup
# Download dependencies using uv
uv sync

# Copy and configure environment
# Edit .env with your Gemini API key and database credentials
cp .env.example .env

# Run database initialization
uv run python -m app.database

# Start the application
uv run uvicorn app.main:app --reload
```

## Environment Variables

```bash
GEMINI_API_KEY=
# Replace these with your database username, password, host, port, and database name.
DATABASE_URL='postgresql://<username>:<password>@<host>:<port>/<database name>'
```

## API Endpoints

- `GET /products` - List all products
- `GET /products/{id}` - Get product by ID
- `GET /products/category/{category}` - Filter by category
- `GET /products/brand/{brand}` - Filter by brand
- `GET /products/search/{name}` - Search products
- `GET /health` - Health check

The service will start on port 8000 by default.

## Development

```bash
# Run tests
uv run pytest

# Format code
uv run ruff format .

# Lint code
uv run ruff check .
```
