# Production build for Product Service (FastAPI)
FROM python:3.13-slim-bookworm

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Create non-root user
RUN groupadd -r appgroup -g 1001 && useradd -r -u 1001 -g appgroup appuser

# Create uv cache directory with proper permissions
RUN mkdir -p /home/appuser/.cache/uv && chown -R appuser:appgroup /home/appuser

WORKDIR /app

# Install dependencies as root
COPY pyproject.toml uv.lock ./
RUN uv sync --no-dev --frozen

# Copy application code
COPY . .

# Fix permissions for only what appuser needs to write
RUN chown appuser:appgroup ./entrypoint.sh && chmod +x ./entrypoint.sh

# Create logs directory with proper permissions
RUN mkdir -p /app/logs && chown appuser:appgroup /app/logs

# Switch to non-root user
USER appuser

ENV PYTHON_ENV=production
ENV PORT=8000

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]
CMD [".venv/bin/uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
