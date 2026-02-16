from contextlib import contextmanager

from sqlmodel import Session, create_engine

from config import Config

engine = create_engine(Config.DATABASE_URL, echo=True)


@contextmanager
def get_session():
    with Session(engine) as session:
        yield session
