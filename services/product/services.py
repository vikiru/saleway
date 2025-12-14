from sqlalchemy.orm import selectinload
from sqlmodel import Session, select

from models import Product, ProductImage


def get_all_products_with_images(session: Session):
    statement = select(Product).options(selectinload(Product.image)).order_by(Product.id)
    result = session.exec(statement).all()
    products_data = []
    for product in result:
        product_dict = product.model_dump(exclude_none=True)
        if hasattr(product, 'image') and product.image:
            product_dict['image'] = product.image.model_dump(exclude_none=True)
        products_data.append(product_dict)
    return products_data


def get_products_by_category(session: Session, category: str):
    statement = (
        select(Product).options(selectinload(Product.image)).where(Product.category == category).order_by(Product.id)
    )
    result = session.exec(statement).all()
    products_data = []
    for product in result:
        product_dict = product.model_dump(exclude_none=True)
        if hasattr(product, 'image') and product.image:
            product_dict['image'] = product.image.model_dump(exclude_none=True)
        products_data.append(product_dict)
    return products_data


def get_product_by_id(session: Session, product_id: int):
    statement = select(Product).options(selectinload(Product.image)).where(Product.id == product_id)
    product = session.exec(statement).first()
    if not product:
        return None
    product_dict = product.model_dump(exclude_none=True)
    if hasattr(product, 'image') and product.image:
        product_dict['image'] = product.image.model_dump(exclude_none=True)
    return product_dict


def get_products_by_brand(session: Session, brand: str):
    statement = select(Product).options(selectinload(Product.image)).where(Product.brand == brand).order_by(Product.id)
    result = session.exec(statement).all()
    products_data = []
    for product in result:
        product_dict = product.model_dump(exclude_none=True)
        if hasattr(product, 'image') and product.image:
            product_dict['image'] = product.image.model_dump(exclude_none=True)
        products_data.append(product_dict)
    return products_data


def get_product_by_name(session: Session, name: str):
    statement = select(Product).options(selectinload(Product.image)).where(Product.name == name)
    result = session.exec(statement).all()
    products_data = []
    for product in result:
        product_dict = product.model_dump(exclude_none=True)
        if hasattr(product, 'image') and product.image:
            product_dict['image'] = product.image.model_dump(exclude_none=True)
        products_data.append(product_dict)
    return products_data


def get_product_images(session: Session):
    statement = select(ProductImage)
    result = session.exec(statement).all()
    return result


def get_product_images_by_product_id(session: Session, product_id: int):
    statement = select(ProductImage).where(ProductImage.product_id == product_id)
    result = session.exec(statement).all()
    return result
