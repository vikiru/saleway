from ninja import NinjaAPI

from .services import (
    get_review_by_id,
    get_reviews_by_product,
    get_reviews_by_user,
    create_review,
    modify_review,
    remove_review,
)
from .models import ApiResponse, UserReviewInput

api = NinjaAPI()


@api.get("/products/{product_id}/reviews/{review_id}")
def retrieve_review_by_id(request, product_id: int, review_id: int) -> ApiResponse:
    try:
        response = get_review_by_id(product_id, review_id)
        if not response.data:
            return ApiResponse(
                message="No matching review found.",
                status=404,
                data={},
                error=response.error,
                success=False,
            )

        return ApiResponse(
            message="Review retrieved successfully.",
            status=200,
            data=response.data,
            error="No errors occured.",
            success=False,
        )
    except Exception as e:
        return ApiResponse(
            message="Review retrieval failed.",
            status=500,
            data={},
            error=str(e),
            success=False,
        )


@api.get("/products/{product_id}/reviews")
def retrieve_review_by_product_id(request, product_id: int) -> ApiResponse:
    try:
        response = get_reviews_by_product(product_id)
        if not response.data:
            return ApiResponse(
                message="No matching reviews found",
                status=404,
                data={},
                error=response.error,
                success=False,
            )
        print(response.data)

        return ApiResponse(
            message="Reviews retrieved successfully.",
            status=200,
            data=response.data,
            error="No errors occured.",
            success=False,
        )
    except Exception as e:
        return ApiResponse(
            message="Review retrieval failed.",
            status=500,
            data={},
            error=str(e),
            success=False,
        )


@api.get("/reviews/users/{user_id}")
def retrieve_reviews_by_user_id(request, user_id: int) -> ApiResponse:
    try:
        response = get_reviews_by_user(user_id)
        if not response.data:
            return ApiResponse(
                message="No matching reviews found",
                status=404,
                data={},
                error=response.error,
                success=False,
            )

        return ApiResponse(
            message="Reviews retrieved successfully.",
            status=200,
            data=response.data,
            error="No errors occured.",
            success=False,
        )
    except Exception as e:
        return ApiResponse(
            message="Review retrieval failed.", status=500, data={}, error=str(e)
        )


@api.post("/products/{product_id}/reviews")
def post_review(request, product_id: int, payload: UserReviewInput) -> ApiResponse:
    try:
        response = create_review(payload)
        if response.error:
            return ApiResponse(
                message="Review creation failed.",
                status=500,
                data={},
                error=response.error,
                success=False,
            )
        return ApiResponse(
            message="Review created successfully.",
            status=201,
            data=response.data,
            error="No errors occured.",
            success=True,
        )
    except Exception as e:
        return ApiResponse(
            message="Review creation failed.",
            status=500,
            data={},
            error=str(e),
            success=False,
        )


@api.put("/products/{product_id}/reviews/{review_id}")
def update_review(
    request, product_id: int, review_id: int, payload: UserReviewInput
) -> ApiResponse:
    try:
        response = modify_review(product_id, review_id, payload)
        if response.error:
            return ApiResponse(
                message="Review update failed.",
                status=500,
                data={},
                error=response.error,
                success=False,
            )
        return ApiResponse(
            message="Review updated successfully.",
            status=200,
            data=response.data,
            error="No errors occured.",
            success=True,
        )
    except Exception as e:
        return ApiResponse(
            message="Review update failed.",
            status=500,
            data={},
            error=str(e),
            success=False,
        )


@api.delete("/products/{product_id}/reviews/{review_id}")
def delete_review(request, product_id: int, review_id: int) -> ApiResponse:
    try:
        response = remove_review(review_id)
        if response.error:
            return ApiResponse(
                message="Review deletion failed.",
                status=500,
                data={},
                error=response.error,
                success=False,
            )
        return ApiResponse(
            message="Review deleted successfully.",
            status=200,
            data={},
            error="No errors occured.",
            success=True,
        )
    except Exception as e:
        return ApiResponse(
            message="Review deletion failed.",
            status=500,
            data={},
            error=str(e),
            success=False,
        )
