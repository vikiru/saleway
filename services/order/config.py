import os
from dotenv import load_dotenv

_ = load_dotenv()


class Config:
    DATABASE_URL: str = os.getenv(
        'DATABASE_URL',
        'postgresql://postgres:password@localhost:5432/ecommerce',
    )
