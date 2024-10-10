from django.db import models
from django.contrib.auth.hashers import make_password
from ninja import Schema
import json


class EcommerceUser(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    user_name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        if self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return json.dumps(self)


class EcommerceUserInput(Schema):
    first_name: str
    last_name: str
    user_name: str
    email: str
    password: str


class EcommerceUserOutput(Schema):
    id: int
    first_name: str
    last_name: str
    user_name: str
    email: str
    password: str
