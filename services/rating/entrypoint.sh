#!/bin/sh
set -e

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

echo "Running database migrations..."
.venv/bin/python manage.py migrate

echo "Starting application..."
exec "$@"
