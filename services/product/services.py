from sqlalchemy.orm import selectinload
from sqlmodel import Session, select
from models import Product, ProductImage
from utils import construct_product_list

# TODO: finish all these, serialization etc. model_dump?

def get_all_products_with_images(session: Session):
    statement = select(Product).options(selectinload(Product.__annotations__['image']))
    result = session.exec(statement).all()
    data = result.model_dump()
    return data

def get_products_by_category(session: Session, category: str):
    statement =  select(Product).options(selectinload(Product.__annotations__['image'])).where(Product.category == category)
    result = session.exec(statement).all()
    data = construct_product_list(result)
    return data

def get_products_by_subcategory(session: Session, subcategory: str):
    statement = select(Product).where(Product.sub_category == subcategory)
    result = session.exec(statement).all()
    data = construct_product_list(result)
    return data

def get_products_by_brand(session: Session, brand: str):
    statement = select(Product, ProductImage).where(Product.brand == brand).join(ProductImage, isouter=True)
    result = session.exec(statement).all()
    data = construct_product_list(result)
    return data

def get_product_by_name(session: Session, name: str):
    statement = select(Product).where(Product.name == name)
    result = session.exec(statement).all()
    return result

def get_product_by_id(session: Session, product_id: int) -> Product | None:
    statement = select(Product).where(Product.id == product_id)
    result = session.exec(statement).first()
    return result

def get_product_images(session: Session):
    statement = select(ProductImage)
    result = session.exec(statement).all()
    return result

def get_product_images_by_product_id(session: Session, product_id: int):
    statement = select(ProductImage).where(ProductImage.product_id == product_id)
    result = session.exec(statement).all()
    return result


