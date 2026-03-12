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

# Fix permissions and create logs directory
RUN chmod +x ./entrypoint.sh && \
    mkdir -p /app/logs && \
    chown appuser:appgroup /app/logs

# Switch to non-root user
USER appuser

ENV PYTHON_ENV=production
ENV PORT=8000

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]
CMD [".venv/bin/uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
