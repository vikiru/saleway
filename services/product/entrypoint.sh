#!/bin/sh
set -e

# Wait for database to be ready
echo "Waiting for database..."
while ! python -c "import socket; socket.create_connection(('${DB_HOST:-postgres}', ${DB_PORT:-5432}), timeout=1)" 2>/dev/null; do
	echo "Waiting for database connection..."
	sleep 1
done

# Run database migrations
echo "Running database migrations..."
.venv/bin/alembic upgrade head

# Seed database (idempotent - skips if already seeded)
echo "Seeding database..."
.venv/bin/python seed.py

# Start the application
echo "Starting application..."
exec "$@"
