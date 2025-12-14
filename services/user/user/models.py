import json

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
from django.db import models
from ninja import Schema


class EcommerceUser(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']

    def save(self, *args, **kwargs):
        if self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return json.dumps(self)


class EcommerceUserInput(Schema):
    first_name: str = ''
    last_name: str = ''
    username: str = ''
    email: str = ''
    password: str = ''


class EcommerceUserOutput(Schema):
    id: int
    first_name: str
    last_name: str
    username: str
    email: str

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
        }


class UserCredentials(Schema):
    email: str
    password: str

    def to_dict(self):
        return {'email': self.email, 'password': self.password}
