import os

from dotenv import load_dotenv

_ = load_dotenv()


class Config:
    DATABASE_URL: str = os.getenv(
        'DATABASE_URL',
        'postgresql://postgres:password@localhost:5432/ecommerce',
    )
    GEMINI_API_KEY: str | None = os.getenv('GEMINI_API_KEY')
    ENVIRONMENT: str = os.getenv('ENVIRONMENT', 'development')


if __name__ == '__main__':
    if not Config.DATABASE_URL:
        raise ValueError('DATABASE_URL is not set. Please set it in the .env file.')
    if not Config.GEMINI_API_KEY:
        raise ValueError('GEMINI_API_KEY is not set. Please set it in the .env file.')
