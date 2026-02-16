import json
import os
from decimal import Decimal

from sqlmodel import Session, select

from database import engine
from models import Product, ProductImage


def load_products_from_json(file_path: str):
    with open(file_path) as f:
        return json.load(f)


def seed_database():
    # Check if already seeded (idempotent)
    with Session(engine) as session:
        existing = session.exec(select(Product)).first()
        if existing:
            print('Database already seeded, skipping...')
            return

    data_file_path = os.path.join(os.path.dirname(__file__), 'data', 'generated_products.json')
    products_data = load_products_from_json(data_file_path)
    print(f'Loaded {len(products_data)} products from generated_products.json')

    with Session(engine) as session:
        for product_data in products_data:
            image_data = product_data.pop('image', {})

            product = Product(
                name=product_data['name'],
                brand=product_data['brand'],
                category=product_data['category'],
                summary=product_data['summary'],
                description=product_data['description'],
                price=Decimal(str(product_data['price'])),
            )
            session.add(product)
            session.flush()

            product_image = ProductImage(
                product_id=product.id,
                image_url=image_data.get('image_url', ''),
                image_author=image_data.get('image_author', ''),
                alt_text=image_data.get('alt_text', ''),
                attribution=image_data.get('attribution', ''),
            )
            session.add(product_image)

        session.commit()

    print(f'Successfully seeded {len(products_data)} products')


if __name__ == '__main__':
    seed_database()
