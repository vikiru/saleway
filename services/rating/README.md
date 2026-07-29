# Rating Service

Django-based product rating and review management service.

## Features
- Product rating system
- User review management
- Average rating calculations
- Django Ninja API integration

## Tech Stack
- **Framework**: Django 6.0
- **API**: Django Ninja
- **Database**: PostgreSQL
- **Development Tools**: uv, Poe the Poet, Ruff

## Setup

### Django Service Startup Process:
1. Activate virtual environment.
```bash
source .venv/bin/activate
```
2. Install Python packages.
```bash
uv sync
```
3. Create PostgreSQL database.
```bash
poe create-db
```
4. Create Django migrations.
```bash
poe create-migrations
```
5. Apply Django migrations.
```bash
poe migrate
```
6. Start development server.
```bash
poe dev
# or start production server:
poe start
```

```bash
# Alternative manual setup
# Download dependencies using uv
uv sync

# Copy and configure environment
# Edit .env with your database credentials
cp .env.example .env

# Run database migrations
uv run python manage.py migrate

# Create superuser (optional)
uv run python manage.py createsuperuser

# Start the application
uv run python manage.py runserver
```

## Environment Variables

```bash
# Replace these with your database username, password, host, port, and database name.
DATABASE_URL='postgresql://<username>:<password>@<host>:<port>/<database name>'

# Frontend CORS
CORS_ALLOWED_ORIGINS='http://localhost:3000'

# Clerk Authentication
CLERK_ISSUER_URL='https://clerk.your-tenant.com'
```

## API Endpoints

- `GET /api/v1/health` - Health check
- `GET /api/v1/products/{product_id}/rating` - Get product average rating
- `GET /api/v1/products/{product_id}/reviews` - Get product reviews
- `POST /api/v1/products/{product_id}/reviews` - Create new review
- `GET /api/v1/products/{product_id}/reviews/{review_id}` - Get review by ID
- `PUT /api/v1/products/{product_id}/reviews/{review_id}` - Update review
- `DELETE /api/v1/products/{product_id}/reviews/{review_id}` - Delete review
- `GET /api/v1/reviews/user/{user_id}` - Get user's reviews

The service will start on port 8001 by default.

## Development

```bash
# Format code
uv run ruff format .

# Lint code
uv run ruff check .
```
