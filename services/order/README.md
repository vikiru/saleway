# Order Service

Flask-based order management and processing service.

## Features
- Order creation and management
- Order status tracking
- Shopping cart integration
- Flask-Marshmallow serialization

## Tech Stack
- **Framework**: Flask
- **Database**: PostgreSQL with SQLAlchemy
- **Serialization**: Flask-Marshmallow
- **Development Tools**: uv, Poe the Poet, Ruff

## Setup

### Flask Service Startup Process:
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
4. Initialize database.
```bash
poe init-db
```
5. Start development server.
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

# Run database initialization
uv run python -m app.database

# Start the application
uv run python app.py
```

## Environment Variables

```bash
# Replace these with your database username, password, host, port, and database name.
DATABASE_URL='postgresql://<username>:<password>@<host>:<port>/<database name>'

# Frontend CORS
FRONTEND_URL='http://localhost:3000'

# Clerk Authentication
CLERK_ISSUER_URL='https://clerk.your-tenant.com'
```

## API Endpoints

- `GET /api/v1/health` - Health check
- `POST /api/v1/orders` - Create new order
- `GET /api/v1/orders/{id}` - Get order by ID
- `PUT /api/v1/orders/{id}` - Update order
- `DELETE /api/v1/orders/{id}` - Delete order
- `GET /api/v1/orders/{id}/items` - Get order items
- `POST /api/v1/orders/{id}/items` - Add item to order
- `GET /api/v1/orders/{id}/items/{item_id}` - Get order item
- `DELETE /api/v1/orders/{id}/items/{item_id}` - Delete order item
- `GET /api/v1/orders/user/{user_id}` - Get user orders
- `GET /api/v1/orders/stripe-session/{session_id}` - Get order by Stripe session

The service will start on port 5000 by default.

## Development

```bash
# Format code
uv run ruff format .

# Lint code
uv run ruff check .
```