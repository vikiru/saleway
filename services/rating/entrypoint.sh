#!/bin/sh
set -e

echo "Waiting for database..."
while ! python -c "import socket; socket.create_connection(('${DB_HOST:-postgres}', ${DB_PORT:-5432}), timeout=1)" 2>/dev/null; do
	echo "Waiting for database connection..."
	sleep 1
done

echo "Running database migrations..."
.venv/bin/python manage.py migrate

echo "Starting application..."
exec "$@"
