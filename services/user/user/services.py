from .models import CommerceUser
from utils.password import hash_password, validate_password


def create_user(
    first_name: str, last_name: str, user_name: str, email: str, password: str
) -> None:
    hashed_password = hash_password(password)
    CommerceUser.objects.create(
        first_name=first_name,
        last_name=last_name,
        user_name=user_name,
        email=email,
        password=hashed_password,
    )


def validate_user(user_name: str, password: str) -> CommerceUser:
    try:
        user = CommerceUser.objects.get(user_name=user_name)
        if user and validate_password(password, user.password):
            return user
        else:
            raise ValueError("The provided password is incorrect.")
    except CommerceUser.DoesNotExist:
        raise ValueError("The provided user does not exist.")


def get_user(id: int) -> CommerceUser:
    try:
        return CommerceUser.objects.get(id=id)
    except CommerceUser.DoesNotExist:
        raise ValueError("The provided user does not exist.")


def update_user(id: int, user: CommerceUser) -> None:
    try:
        CommerceUser.objects.filter(id=id).update(user=user)
    except CommerceUser.DoesNotExist:
        raise ValueError("The provided user does not exist.")


def delete_user(id: int) -> None:
    try:
        CommerceUser.objects.filter(id=id).delete()
    except CommerceUser.DoesNotExist:
        raise ValueError("The provided user does not exist.")
