# User Service

Django-based user authentication and profile management service.

## Features
- User registration and authentication
- Profile management
- Django Allauth integration
- JWT token management

## Tech Stack
- **Framework**: Django 6.0
- **API**: Django Ninja
- **Auth**: Django Allauth
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
FRONTEND_URL='http://localhost:3000'
```

## API Endpoints

- `GET /api/v1/health` - Health check
- `POST /api/v1/users` - Create new user
- `GET /api/v1/users/{user_id}` - Get user by ID
- `PUT /api/v1/users/{user_id}` - Update user
- `DELETE /api/v1/users/{user_id}` - Delete user

The service will start on port 8002 by default.

## Development

```bash
# Format code
uv run ruff format .

# Lint code
uv run ruff check .
```
