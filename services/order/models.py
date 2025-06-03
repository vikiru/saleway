from datetime import datetime, timezone
from enum import Enum as PythonEnum
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum, Column, Integer, DateTime, ForeignKey, Text, Numeric
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class OrderStatus(PythonEnum):
    PENDING = 'pending'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
    DELIVERED = 'delivered'

    def __str__(self):
        return self.value

class Order(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    purchase_date = Column(DateTime(timezone=True), nullable=False)
    expected_delivery_date = Column(DateTime(timezone=True), nullable=False)
    items = relationship('OrderItem', back_populates='order', lazy=True)
    total_price = Column(Numeric, nullable=False)
    status = Column(Enum(OrderStatus), nullable=False, default=OrderStatus.PENDING) 
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class OrderItem(db.Model):
    id = Column(Integer, primary_key=True)
    order = relationship("Order", back_populates="items")
    order_id = Column(Integer, ForeignKey('order.id'), nullable=False)
    product_id = Column(Integer, nullable=False)
    product_name = Column(Text, nullable=False)
    product_brand = Column(Text, nullable=False)
    product_description = Column(Text, nullable=False)
    product_image = Column(Text, nullable=False)
    product_unit_price = Column(Numeric, nullable=False)
    product_total_price = Column(Numeric, nullable=False)
    product_quantity = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

