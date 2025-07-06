from datetime import datetime, timezone
from decimal import Decimal
from enum import Enum as PythonEnum
from typing import override
from sqlmodel import Field, Relationship, SQLModel


class OrderStatus(PythonEnum):
    PENDING = 'pending'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
    DELIVERED = 'delivered'

    @override
    def __str__(self) -> str:
        return self.value


# Table name: 'order'
class Order(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int
    purchase_date: datetime
    expected_delivery_date: datetime
    total_price: Decimal
    status: OrderStatus = Field(default=OrderStatus.PENDING)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    items: list['OrderItem'] = Relationship(
        back_populates='order', sa_relationship_kwargs={'cascade': 'all'}
    )


# Table name: 'orderitem'
class OrderItem(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    order_id: int | None = Field(default=None, foreign_key='order.id')
    product_id: int
    product_name: str
    product_brand: str
    product_description: str
    product_image: str
    product_unit_price: Decimal
    product_total_price: Decimal
    product_quantity: int
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    order: Order | None = Relationship(back_populates='items')
