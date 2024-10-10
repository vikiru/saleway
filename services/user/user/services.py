from .models import EcommerceUser, EcommerceUserInput
from django.shortcuts import get_object_or_404


def create_user(first_name, last_name, user_name, email, password) -> None:
    EcommerceUser.objects.create(
        first_name=first_name,
        last_name=last_name,
        user_name=user_name,
        email=email,
        password=password,
    )


def get_user_by_id(id: int) -> EcommerceUser:
    return get_object_or_404(EcommerceUser, id=id)


def modify_user(id: int, user: EcommerceUserInput) -> None:
    user = get_object_or_404(EcommerceUser, id=id)
    for attr, value in user.dict().items():
        setattr(user, attr, value)
    user.save()


def remove_user(id: int) -> None:
    EcommerceUser.objects.filter(id=id).delete()
