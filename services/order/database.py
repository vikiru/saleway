from contextlib import contextmanager

from sqlalchemy import text
from sqlmodel import Session, SQLModel, create_engine

from config import Config

engine = create_engine(Config.DATABASE_URL, echo=True)


@contextmanager
def get_session():
    with Session(engine) as session:
        yield session


def init_db():
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        session.exec(text('DELETE FROM orderitem'))
        session.exec(text('DELETE FROM "order"'))
        session.execute(text('ALTER SEQUENCE order_id_seq RESTART WITH 1'))
        session.execute(text('ALTER SEQUENCE orderitem_id_seq RESTART WITH 1'))
        session.commit()


if __name__ == '__main__':
    init_db()
