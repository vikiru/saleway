# User Service

User profile and account management service built with [Django](https://www.djangoproject.com/), [Django Ninja](https://django-ninja.dev/), and [Django Allauth](https://docs.allauth.org/).

## Features

- User creation and profile management
- Authentication and session handling via Django Allauth
- OpenAPI-compliant API routing with Django Ninja
- Standardized health monitoring probe

## Tech Stack

- **Framework**: [Django](https://www.djangoproject.com/) 6.0
- **API Framework**: [Django Ninja](https://django-ninja.dev/)
- **Language**: [Python](https://www.python.org/) 3.13
- **Database**: [PostgreSQL](https://www.postgresql.org/) with Django ORM
- **Authentication**: [Django Allauth](https://docs.allauth.org/)
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
DATABASE_URL='postgresql://user_service:<password>@localhost:5432/user_db'

# Frontend CORS
FRONTEND_URL='http://localhost:3000'
```

## API Endpoints

- `GET /api/v1/health` - Health check probe
- `POST /api/v1/users` - Create new user
- `GET /api/v1/users/{user_id}` - Get user by ID
- `PUT /api/v1/users/{user_id}` - Update user
- `DELETE /api/v1/users/{user_id}` - Delete user

The service runs on port `8002` by default.

## Available Scripts

- `uv run poe dev` - Start development server with hot reload
- `uv run poe start` - Start production server with Gunicorn
- `uv run poe migrate` - Apply Django database migrations
- `uv run poe create-migrations` - Create new Django migrations
- `uv run poe lint` - Lint and fix code with Ruff
- `uv run poe format` - Format code with Ruff
- `uv run poe typecheck` - Run type checks with basedpyright
