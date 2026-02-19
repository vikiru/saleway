import json
from datetime import datetime

from django.db import models
from ninja import Schema


class UserReview(models.Model):
    user_id = models.CharField(max_length=255)
    product_id = models.IntegerField()
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    review = models.TextField()
    rating = models.IntegerField()
    date_reviewed = models.DateTimeField(auto_now_add=True)
    date_purchased = models.DateTimeField()

    class Meta:
        unique_together = ['user_id', 'product_id']
        constraints = [
            models.CheckConstraint(condition=models.Q(rating__gte=1) & models.Q(rating__lte=5), name='rating_range')
        ]

    def __str__(self):
        return json.dumps(self)


class UserReviewInput(Schema):
    user_id: str
    product_id: int
    review: str
    rating: int
    title: str
    author: str
    date_purchased: datetime

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'product_id': self.product_id,
            'review': self.review,
            'rating': self.rating,
            'title': self.title,
            'author': self.author,
            'date_purchased': self.date_purchased,
        }


class UserReviewOutput(Schema):
    id: int
    user_id: str
    product_id: int
    title: str
    author: str
    review: str
    rating: int
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
