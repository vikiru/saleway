from django.db import models
from ninja import Schema
import json


class UserReview(models.Model):
    user_id = models.IntegerField()
    product_id = models.IntegerField()
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    review = models.TextField()
    rating = models.IntegerField()
    date_reviewed = models.DateTimeField()
    date_purchased = models.DateTimeField()

    def __str__(self):
        return json.dumps(self)


class UserReviewInput(Schema):
    user_id: int
    product_id: int
    review: str
    rating: int
    title: str
    author: str
    review: str
    rating: int
    date_reviewed: str
    date_purchased: str

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "product_id": self.product_id,
            "review": self.review,
            "rating": self.rating,
            "title": self.title,
            "author": self.author,
            "date_reviewed": self.date_reviewed,
            "date_purchased": self.date_purchased,
        }


class UserReviewOutput(Schema):
    id: int
    user_id: int
    product_id: int
    title: str
    author: str
    review: str
    rating: int
    date_reviewed: str
    date_purchased: str

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "title": self.title,
            "author": self.author,
            "review": self.review,
            "rating": self.rating,
            "date_reviewed": self.date_reviewed,
            "date_purchased": self.date_purchased,
        }


class ApiResponse(Schema):
    message: str
    status: int
    data: dict
    error: str
    success: bool

    def to_dict(self):
        return {
            "message": self.message,
            "status": self.status,
            "data": self.data,
            "error": self.error,
            "success": self.success,
        }


class ServiceResponse(Schema):
    data: dict
    error: str = None

    def to_dict(self):
        return {"data": self.data, "error": self.error}
