from datetime import datetime, timezone
from decimal import Decimal
from enum import Enum as PythonEnum
from typing import override

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel


class OrderStatus(PythonEnum):
    PENDING = 'pending'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
    DELIVERED = 'delivered'

    @override
    def __str__(self) -> str:
        return self.value


class OrderCreate(BaseModel):
    user_id: str
    items: list[dict]
    purchase_date: datetime
    total_price: Decimal


class OrderItemCreate(BaseModel):
    product_id: int
    product_name: str
    product_brand: str
    product_description: str
    product_image: str
    product_unit_price: Decimal
    product_quantity: int


class OrderItemRead(BaseModel):
    id: int
    product_id: int
    product_name: str
    product_brand: str
    product_description: str
    product_image: str
    product_unit_price: float
    product_total_price: float
    product_quantity: int
    created_at: str
    updated_at: str


class OrderRead(BaseModel):
    id: int
    user_id: str
    purchase_date: str
    expected_delivery_date: str
    total_price: float
    status: str
    created_at: str
    updated_at: str
    items: list[OrderItemRead] = []


class Order(SQLModel, table=True):
    __tablename__ = 'orders'
    id: int | None = Field(default=None, primary_key=True)
    user_id: str
    purchase_date: datetime
    expected_delivery_date: datetime
    total_price: Decimal
    status: OrderStatus = Field(default=OrderStatus.PENDING)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    items: list['OrderItem'] = Relationship(back_populates='order', sa_relationship_kwargs={'cascade': 'all'})


class OrderItem(SQLModel, table=True):
    __tablename__ = 'order_items'
    id: int = Field(default=None, primary_key=True)
    order_id: int | None = Field(default=None, foreign_key='orders.id')
    product_id: int
    product_name: str
    product_brand: str
    product_description: str
    product_image: str
    product_unit_price: Decimal
    product_total_price: Decimal
    product_quantity: int
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    order: Order | None = Relationship(back_populates='items')
