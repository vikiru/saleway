from contextlib import contextmanager
from sqlmodel import SQLModel, Session, create_engine
from config import Config

engine = create_engine(Config.DATABASE_URL, echo=True)

@contextmanager
def get_session():
    with Session(engine) as session:
        yield session


def init_db():
    SQLModel.metadata.create_all(engine)


if __name__ == '__main__':
    init_db()
