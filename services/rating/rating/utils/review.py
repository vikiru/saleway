from rating.models import UserReview, UserReviewOutput


def extract_review(review: UserReview) -> UserReviewOutput:
    user_review = UserReviewOutput(
        id=review.id,
        user_id=review.user_id,
        product_id=review.product_id,
        title=review.title,
        author=review.author,
        review=review.review,
        rating=review.rating,
        date_reviewed=review.date_reviewed.isoformat(),
        date_purchased=review.date_purchased.isoformat(),
    )
    user_review_dict = user_review.to_dict()
    return user_review_dict


def extract_reviews(reviews: list[UserReview]) -> list[dict]:
    return [extract_review(review) for review in reviews]
