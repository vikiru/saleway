# Production build for Rating Service (Django)
FROM python:3.13-slim-bookworm

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Create non-root user
RUN groupadd -r appgroup -g 1001 && useradd -r -u 1001 -g appgroup appuser

WORKDIR /app

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install production dependencies
RUN uv sync --no-dev --frozen

# Copy application code
COPY --chown=appuser:appgroup . .


# Switch to non-root user
USER appuser

ENV DJANGO_SETTINGS_MODULE=rating.settings.production
ENV PORT=8001

EXPOSE 8001

# Migrations must be run separately as a job, not on container startup
# Run: docker-compose exec rating uv run python manage.py migrate
CMD ["uv", "run", "gunicorn", "--bind", "0.0.0.0:8001", "--workers", "2", "--timeout", "30", "rating.wsgi:application"]
