# Stage 1: Build
FROM python:3.13-slim-bookworm AS builder

# Pin uv version
COPY --from=ghcr.io/astral-sh/uv:0.5 /uv /bin/uv

ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy

WORKDIR /app

# Install dependencies
COPY pyproject.toml uv.lock ./
RUN uv sync --no-dev --frozen

# Stage 2: Runtime
FROM python:3.13-slim-bookworm

# Create non-root user
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
RUN groupadd -r appgroup -g 1001 && useradd -r -u 1001 -g appgroup appuser

WORKDIR /app

# Copy virtual environment and application code
COPY --from=builder --chown=appuser:appgroup /app/.venv /app/.venv
COPY --chown=appuser:appgroup . .

# Fix permissions
RUN chmod +x ./entrypoint.sh

# Switch to non-root user
USER appuser

ENV PYTHON_ENV=production
ENV PORT=8001

EXPOSE 8001

ENV GUNICORN_WORKERS=2
ENTRYPOINT ["./entrypoint.sh"]
CMD ["sh", "-c", ".venv/bin/gunicorn --bind 0.0.0.0:8001 --workers ${GUNICORN_WORKERS} rating.wsgi:application"]
