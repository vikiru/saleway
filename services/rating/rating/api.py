from django.views.decorators.csrf import csrf_exempt
from ninja import NinjaAPI

from .definitions import ErrorResponse, SuccessResponse
from .models import UserReviewInput, UserReviewUpdateInput
from .services import (
    create_review,
    get_product_average_rating,
    get_review_by_id,
    get_reviews_by_product,
    get_reviews_by_user,
    modify_review,
    remove_review,
)

api = NinjaAPI()


@api.get('/products/{product_id}/reviews/{review_id}')
def retrieve_review_by_id(request, product_id: int, review_id: int) -> SuccessResponse[dict] | ErrorResponse:
    try:
        response = get_review_by_id(product_id, review_id)
        if not response.data:
            return ErrorResponse(success=False, error='No matching review found.')

        return SuccessResponse(success=True, message='Review retrieved successfully.', data=response.data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'Review retrieval failed: {str(e)}')


@api.get('/products/{product_id}/rating')
def retrieve_product_average_rating(request, product_id: int) -> SuccessResponse[dict] | ErrorResponse:
    try:
        response = get_product_average_rating(product_id)
        return SuccessResponse(success=True, message='Average rating retrieved successfully.', data=response.data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'Average rating retrieval failed: {str(e)}')


@api.get('/products/{product_id}/reviews')
def retrieve_review_by_product_id(request, product_id: int) -> SuccessResponse[dict] | ErrorResponse:
    try:
        response = get_reviews_by_product(product_id)
        return SuccessResponse(success=True, message='Reviews retrieved successfully.', data=response.data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'Review retrieval failed: {str(e)}')


@api.get('/reviews/user/{user_id}')
def retrieve_reviews_by_user_id(request, user_id: str) -> SuccessResponse[list] | ErrorResponse:
    try:
        response = get_reviews_by_user(user_id)
        if not response.data:
            return ErrorResponse(success=False, error='No matching reviews found')

        return SuccessResponse(success=True, message='Reviews retrieved successfully.', data=response.data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'Review retrieval failed: {str(e)}')


@api.post('/products/{product_id}/reviews')
@csrf_exempt
def post_review(request, product_id: int, payload: UserReviewInput) -> SuccessResponse[dict] | ErrorResponse:
    try:
        response = create_review(payload)
        if response.error:
            return ErrorResponse(success=False, error='Review creation failed.')
        return SuccessResponse(success=True, message='Review created successfully.', data=response.data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'Review creation failed: {str(e)}')


@api.put('/products/{product_id}/reviews/{review_id}')
@csrf_exempt
def update_review(
    request, product_id: int, review_id: int, payload: UserReviewUpdateInput
) -> SuccessResponse[dict] | ErrorResponse:
    try:
        response = modify_review(review_id, payload)
        if response.error:
            return ErrorResponse(success=False, error='Review update failed.')
        return SuccessResponse(success=True, message='Review updated successfully.', data=response.data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'Review update failed: {str(e)}')


@api.delete('/products/{product_id}/reviews/{review_id}')
@csrf_exempt
def delete_review(request, product_id: int, review_id: int) -> SuccessResponse[dict] | ErrorResponse:
    try:
        response = remove_review(review_id)
        if response.error:
            return ErrorResponse(success=False, error='Review deletion failed.')
        return SuccessResponse(success=True, message='Review deleted successfully.', data={})
    except Exception as e:
        return ErrorResponse(success=False, error=f'Review deletion failed: {str(e)}')
