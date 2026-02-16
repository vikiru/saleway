#!/bin/sh
set -e

echo "Running database migrations..."
.venv/bin/python manage.py migrate

echo "Starting application..."
exec "$@"
