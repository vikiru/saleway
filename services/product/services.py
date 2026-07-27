from sqlalchemy.orm import selectinload
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from models import Product, ProductImage


async def get_all_products_with_images(session: AsyncSession):
    statement = select(Product).options(selectinload(Product.image)).order_by(Product.id)
    result = (await session.exec(statement)).all()
    products_data = []
    for product in result:
        product_dict = product.model_dump(exclude_none=True)
        if hasattr(product, 'image') and product.image:
            product_dict['image'] = product.image.model_dump(exclude_none=True)
        products_data.append(product_dict)
    return products_data


async def get_products_by_category(session: AsyncSession, category: str):
    statement = (
        select(Product).options(selectinload(Product.image)).where(Product.category == category).order_by(Product.id)
    )
    result = (await session.exec(statement)).all()
    products_data = []
    for product in result:
        product_dict = product.model_dump(exclude_none=True)
        if hasattr(product, 'image') and product.image:
            product_dict['image'] = product.image.model_dump(exclude_none=True)
        products_data.append(product_dict)
    return products_data


async def get_product_by_id(session: AsyncSession, product_id: int):
    statement = select(Product).options(selectinload(Product.image)).where(Product.id == product_id)
    product = (await session.exec(statement)).first()
    if not product:
        return None
    product_dict = product.model_dump(exclude_none=True)
    if hasattr(product, 'image') and product.image:
        product_dict['image'] = product.image.model_dump(exclude_none=True)
    return product_dict


async def get_products_by_brand(session: AsyncSession, brand: str):
    statement = select(Product).options(selectinload(Product.image)).where(Product.brand == brand).order_by(Product.id)
    result = (await session.exec(statement)).all()
    products_data = []
    for product in result:
        product_dict = product.model_dump(exclude_none=True)
        if hasattr(product, 'image') and product.image:
            product_dict['image'] = product.image.model_dump(exclude_none=True)
        products_data.append(product_dict)
    return products_data


async def get_product_by_name(session: AsyncSession, name: str):
    statement = select(Product).options(selectinload(Product.image)).where(Product.name == name)
    result = (await session.exec(statement)).all()
    products_data = []
    for product in result:
        product_dict = product.model_dump(exclude_none=True)
        if hasattr(product, 'image') and product.image:
            product_dict['image'] = product.image.model_dump(exclude_none=True)
        products_data.append(product_dict)
    return products_data


async def get_product_images(session: AsyncSession):
    statement = select(ProductImage)
    result = (await session.exec(statement)).all()
    return result


async def get_product_images_by_product_id(session: AsyncSession, product_id: int):
    statement = select(ProductImage).where(ProductImage.product_id == product_id)
    result = (await session.exec(statement)).all()
    return result
