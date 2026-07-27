from contextlib import asynccontextmanager

from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession

from config import Config

db_url = Config.DATABASE_URL.replace('postgresql://', 'postgresql+asyncpg://')
engine = create_async_engine(db_url, echo=False)


@asynccontextmanager
async def get_session():
    async with AsyncSession(engine) as session:
        yield session
