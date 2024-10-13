from services.rating.rating.models import UserReview, UserReviewInput
from services.user.user.models import ServiceResponse


def get_review_by_id(review_id: int) -> ServiceResponse:
    try:
        review = UserReview.objects.filter(id=review_id).first()
        return ServiceResponse(data=review, error="")
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def get_reviews_by_user(user_id: int) -> ServiceResponse:
    try:
        reviews = UserReview.objects.filter(user_id=user_id)
        return ServiceResponse(data=reviews, error="")
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def get_reviews_by_product(product_id: int) -> ServiceResponse:
    try:
        reviews = UserReview.objects.filter(product_id=product_id)
        return ServiceResponse(data=reviews, error="")
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def create_review(payload: UserReviewInput) -> ServiceResponse:
    try:
        review = UserReview(
            user_id=payload.user_id,
            product_id=payload.product_id,
            title=payload.title,
            author=payload.author,
            review=payload.review,
            rating=payload.rating,
            date_reviewed=payload.date_reviewed,
            data_purchased=payload.data_purchased,
        )
        review.save()
        return ServiceResponse(data=review, error="")
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def modify_review(review_id: int, updated_review: UserReviewInput) -> ServiceResponse:
    try:
        review = UserReview.objects.filter(id=review_id).first()
        if not review:
            return ServiceResponse(data={}, error="Review not found")
        updated_data = updated_review.dict()
        for attr, value in updated_data.items():
            if value:
                setattr(review, attr, value)
        review.save()
        return ServiceResponse(data=review, error="")
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def remove_review(review_id: int) -> ServiceResponse:
    try:
        review = UserReview.objects.filter(id=review_id).first()
        if not review:
            return ServiceResponse(data={}, error="Review not found")
        review.delete()
        return ServiceResponse(data={}, error="")
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))
