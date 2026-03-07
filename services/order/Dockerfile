# Production build for Order Service (Flask)
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

# Switch to non-root user
USER appuser

ENV PYTHON_ENV=production
ENV PORT=5000

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]
CMD [".venv/bin/python", "app.py"]
