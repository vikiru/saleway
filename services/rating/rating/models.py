from datetime import datetime

from django.db import models
from ninja import Schema


class UserReview(models.Model):
    user_id = models.CharField(max_length=255)
    product_id = models.IntegerField(db_index=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    review = models.TextField()
    rating = models.FloatField()
    date_reviewed = models.DateTimeField(default=datetime.now)
    date_purchased = models.DateTimeField()

    class Meta:
        unique_together = ['user_id', 'product_id']
        constraints = [
            models.CheckConstraint(condition=models.Q(rating__gte=0) & models.Q(rating__lte=5), name='rating_range')
        ]

    def __str__(self):
        return f'{self.user_id} - {self.product_id}'


class UserReviewInput(Schema):
    user_id: str
    product_id: int
    review: str
    rating: float
    title: str
    author: str
    date_reviewed: datetime
    date_purchased: datetime

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'product_id': self.product_id,
            'review': self.review,
            'rating': self.rating,
            'title': self.title,
            'author': self.author,
            'date_reviewed': self.date_reviewed,
            'date_purchased': self.date_purchased,
        }


class UserReviewUpdateInput(Schema):
    user_id: str | None = None
    product_id: int | None = None
    review: str | None = None
    rating: float | None = None
    title: str | None = None
    author: str | None = None
    date_reviewed: datetime | None = None
    date_purchased: datetime | None = None


class UserReviewOutput(Schema):
    id: int
    user_id: str
    product_id: int
    title: str
    author: str
    review: str
    rating: float
    date_reviewed: datetime
    date_purchased: datetime

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'title': self.title,
            'author': self.author,
            'review': self.review,
            'rating': self.rating,
            'date_reviewed': self.date_reviewed,
            'date_purchased': self.date_purchased,
        }
