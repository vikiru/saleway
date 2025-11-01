from __future__ import annotations
from decimal import Decimal
from datetime import datetime, timezone
from pydantic import HttpUrl
from sqlmodel import Field, Relationship, SQLModel, func


class Product(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    brand: str
    category: str
    sub_category: str
    summary: str
    description: str
    price: Decimal
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        sa_column_kwargs={'server_default': func.now(), 'onupdate': func.now()}
    )

    image: ProductImage = Relationship(back_populates='product', sa_relationship_kwargs={"uselist": False})


class ProductImage(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    product_id: int = Field(foreign_key='product.id', unique=True)
    image_url: HttpUrl
    image_author: str
    alt_text: str
    attribution: str
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        sa_column_kwargs={'server_default': func.now(), 'onupdate': func.now()}
    )
    
    product: Product = Relationship(back_populates='image')
