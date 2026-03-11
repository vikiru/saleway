from .definitions import ServiceResponse
from .models import UserReview, UserReviewInput
from .utils.review import extract_review, extract_reviews


def get_review_by_id(product_id: int, review_id: int) -> ServiceResponse:
    try:
        review = UserReview.objects.filter(product_id=product_id, id=review_id).first()
        if not review:
            return ServiceResponse(data={}, error='There is no review matching the provided id')
        data = extract_review(review)
        return ServiceResponse(data=data, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def get_reviews_by_user(user_id: str) -> ServiceResponse:
    try:
        reviews = UserReview.objects.filter(user_id=user_id)
        if not reviews:
            return ServiceResponse(data={}, error='There are no reviews matching the provided user.')
        data = extract_reviews(reviews)
        return ServiceResponse(data=data, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def get_reviews_by_product(product_id: int) -> ServiceResponse:
    try:
        reviews = UserReview.objects.filter(product_id=product_id).all()
        if not reviews:
            return ServiceResponse(data={}, error='There are no reviews matching the provided product.')
        data = extract_reviews(reviews)
        print(data)
        return ServiceResponse(data=data, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def create_review(payload: UserReviewInput) -> ServiceResponse:
    try:
        review = UserReview.objects.create(
            user_id=payload.user_id,
            product_id=payload.product_id,
            title=payload.title,
            author=payload.author,
            review=payload.review,
            rating=payload.rating,
            date_purchased=payload.date_purchased,
        )
        data = extract_review(review)
        return ServiceResponse(data=data, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def modify_review(review_id: int, updated_review: UserReviewInput) -> ServiceResponse:
    try:
        review = UserReview.objects.filter(id=review_id).first()
        if not review:
            return ServiceResponse(data={}, error='Review not found')
        updated_data = updated_review.dict()
        for attr, value in updated_data.items():
            if value:
                setattr(review, attr, value)
        review.save()
        data = extract_review(review)
        return ServiceResponse(data=data, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def remove_review(review_id: int) -> ServiceResponse:
    try:
        review = UserReview.objects.filter(id=review_id).first()
        if not review:
            return ServiceResponse(data={}, error='Review not found')
        review.delete()
        return ServiceResponse(data={}, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))
