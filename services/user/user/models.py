from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
from django.db import models
from ninja import Schema


class EcommerceUser(AbstractUser):
    clerk_user_id = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255, blank=True, default='')
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'clerk_user_id']

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email


class EcommerceUserCreate(Schema):
    clerk_user_id: str
    first_name: str
    last_name: str
    username: str
    email: str


class EcommerceUserInput(Schema):
    first_name: str = ''
    last_name: str = ''
    username: str = ''
    email: str = ''


class EcommerceUserOutput(Schema):
    id: str
    first_name: str
    last_name: str
    username: str
    email: str

    @staticmethod
    def from_user(user: 'EcommerceUser'):
        return EcommerceUserOutput(
            id=user.clerk_user_id,
            first_name=user.first_name,
            last_name=user.last_name,
            username=user.username,
            email=user.email,
        )
