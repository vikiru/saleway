from sqlmodel import Sequence
from models import Product
from .types.main import ProductImageSchema, ProductSchema

def construct_product_list(result: Sequence[Product]):
    data: list[ProductSchema] = []
    for product in result:
        data.append(product_with_image_to_schema(product))
    return data

def product_with_image_to_schema(product: Product) -> ProductSchema:
    return ProductSchema(
        id=product.id,
        name=product.name,
        brand=product.brand,
        category=product.category,
        sub_category=product.sub_category,
        summary=product.summary,
        description=product.description,
        price=product.price,
        created_at=product.created_at,
        updated_at=product.updated_at,
        image=ProductImageSchema(**product.image.__dict__)
    ) 
