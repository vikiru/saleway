from django.db.models import Avg

from .definitions import ServiceResponse
from .models import UserReview, UserReviewInput, UserReviewUpdateInput
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
        reviews_list = extract_reviews(reviews)
        avg_rating = round(sum(r['rating'] for r in reviews_list) / len(reviews_list), 1) if reviews_list else 0
        data = {'reviews': reviews_list, 'average_rating': avg_rating, 'total_reviews': len(reviews_list)}
        return ServiceResponse(data=data, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def get_product_average_rating(product_id: int) -> ServiceResponse:
    try:
        result = UserReview.objects.filter(product_id=product_id).aggregate(avg_rating=Avg('rating'))
        avg_rating = round(result['avg_rating'] or 0, 1)
        return ServiceResponse(data={'average_rating': avg_rating}, error='')
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
            date_reviewed=payload.date_reviewed,
            date_purchased=payload.date_purchased,
        )
        data = extract_review(review)
        return ServiceResponse(data=data, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def modify_review(review_id: int, updated_review: UserReviewInput | UserReviewUpdateInput) -> ServiceResponse:
    try:
        review = UserReview.objects.filter(id=review_id).first()
        if not review:
            return ServiceResponse(data={}, error='Review not found')
        updated_data = updated_review.model_dump(exclude_unset=True)
        for attr, value in updated_data.items():
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
