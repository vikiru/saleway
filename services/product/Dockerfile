# Production build for Product Service (FastAPI)
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

ENV PYTHON_ENV=production
ENV PORT=8000

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
