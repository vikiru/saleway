#!/bin/sh
set -e

# Wait for database to be ready
echo "Waiting for database..."
MAX_RETRIES=30
RETRY_COUNT=0
while ! python -c "import socket; socket.create_connection(('${DB_HOST:-postgres}', ${DB_PORT:-5432}), timeout=1)" 2>/dev/null; do
	RETRY_COUNT=$((RETRY_COUNT + 1))
	if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
		echo "Database connection timed out after $MAX_RETRIES seconds. Exiting..."
		exit 1
	fi
	echo "Waiting for database connection ($RETRY_COUNT/$MAX_RETRIES)..."
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
