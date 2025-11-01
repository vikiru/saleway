from database import get_session
from services import get_all_products_with_images
from .types.response import ServiceResponse

def fetch_all_products(): 
    session = get_session()
    try:
        products = get_all_products_with_images(session)
        return ServiceResponse(success=True, data=products)
    except Exception:
        return Response(success=False, error="Failed to fetch all products. An unexpected error occured.")

def get_product_by_id(product_id):
    session = get_session()
    try:
        product = get_product_by_id(session, product_id)
        return Response(success=True, data=product)
    except Exception:
        return Response(success=False, error="Failed to fetch product. An unexpected error occured.")


