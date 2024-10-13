from django.db import models
from ninja import Schema
import json


class UserReview(models.Model):
    user_id = models.IntegerField()
    product_id = models.IntegerField()
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    review = models.TextField()
    rating = models.IntegerField(max=10)
    date_reviewed = models.DateTimeField(auto_now_add=True)
    data_purchased = models.DateTimeField()

    def __str__(self):
        return json.dumps(self)


class UserReviewInput(Schema):
    review: str
    rating: int


class UserReviewOutput(Schema):
    id: int
    user_id: int
    product_id: int
    title: str
    author: str
    review: str
    rating: int
    date_reviewed: str
    data_purchased: str


class ApiResponse(Schema):
    message: str
    status: int
    data: dict
    error: str
    success: bool


class ServiceResponse(Schema):
    data: dict
    error: str = None
