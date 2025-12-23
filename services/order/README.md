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
1. Activate virtual environment: `source .venv/bin/activate`
2. Install Python packages: `uv sync`
3. Create PostgreSQL database: `poe create-db`
4. Initialize database: `poe init-db`
5. Start development server: `poe dev` or start production server: `poe start`

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
```

## API Endpoints

- `GET /orders` - List all orders
- `POST /orders` - Create new order
- `GET /orders/{id}` - Get order by ID
- `PUT /orders/{id}` - Update order
- `DELETE /orders/{id}` - Delete order
- `GET /orders/{id}/items` - Get order items
- `POST /orders/{id}/items` - Add item to order
- `GET /orders/user/{user_id}` - Get user orders

The service will start on port 5000 by default.

## Development

```bash
# Run tests
uv run pytest

# Format code
uv run ruff format .

# Lint code
uv run ruff check .
```