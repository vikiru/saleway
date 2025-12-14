from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class ProductImageSchema(BaseModel):
    id: int
    product_id: int
    image_url: str
    image_author: str
    alt_text: str
    attribution: str
    created_at: datetime
    updated_at: datetime


class ProductSchema(BaseModel):
    id: int
    name: str
    brand: str
    category: str
    summary: str
    description: str
    price: Decimal
    created_at: datetime
    updated_at: datetime
    image: ProductImageSchema
