from database import get_session
from definitions import ErrorResponse, SuccessResponse
from services import (
    get_all_products_with_images,
    get_product_by_id,
    get_product_by_name,
    get_products_by_brand,
    get_products_by_category,
)


def fetch_all_products():
    with get_session() as session:
        try:
            products = get_all_products_with_images(session)
            return SuccessResponse(
                success=True,
                message='Products fetched successfully',
                data=products,
            )
        except Exception as e:
            print(f'Error in fetch_all_products: {e}')
            return ErrorResponse(
                success=False,
                error=('Failed to fetch all products. An unexpected error occurred.'),
            )


def fetch_product_by_id(product_id: int):
    with get_session() as session:
        try:
            product = get_product_by_id(session, product_id)
            return SuccessResponse(
                success=True,
                message='Product fetched successfully',
                data=product,
            )
        except Exception:
            return ErrorResponse(
                success=False,
                error='Failed to fetch product. An unexpected error occurred.',
            )


def fetch_products_by_category(category: str):
    with get_session() as session:
        try:
            products = get_products_by_category(session, category)
            return SuccessResponse(
                success=True,
                message=f'Products in category {category} fetched successfully',
                data=products,
            )
        except Exception:
            return ErrorResponse(
                success=False,
                error='Failed to fetch products by category. An unexpected error occurred.',
            )


def fetch_products_by_brand(brand: str):
    with get_session() as session:
        try:
            products = get_products_by_brand(session, brand)
            return SuccessResponse(
                success=True,
                message=f'Products by brand {brand} fetched successfully',
                data=products,
            )
        except Exception:
            return ErrorResponse(
                success=False,
                error='Failed to fetch products by brand. An unexpected error occurred.',
            )


def fetch_products_by_name(name: str):
    with get_session() as session:
        try:
            products = get_product_by_name(session, name)
            return SuccessResponse(
                success=True,
                message=f'Products matching name {name} fetched successfully',
                data=products,
            )
        except Exception:
            return ErrorResponse(
                success=False,
                error='Failed to fetch products by name. An unexpected error occurred.',
            )
