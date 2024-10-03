from models import User
from utils import hash_password, validate_password


def create_user(
    first_name: str, last_name: str, user_name: str, email: str, password: str
) -> None:
    hashed_password = hash_password(password)
    User.objects.create(
        first_name=first_name,
        last_name=last_name,
        user_name=user_name,
        email=email,
        password=hashed_password,
    )


def validate_user(user_name: str, password: str) -> User:
    try:
        user = User.objects.get(user_name=user_name)
        if user and validate_password(password, user.password):
            return user
        else:
            raise ValueError("The provided password is incorrect.")
    except User.DoesNotExist:
        raise ValueError("The provided user does not exist.")


def get_user(id: int) -> User:
    try:
        return User.objects.get(id=id)
    except User.DoesNotExist:
        raise ValueError("The provided user does not exist.")


def update_user(id: int, user: User) -> None:
    try:
        User.objects.filter(id=id).update(user=user)
    except User.DoesNotExist:
        raise ValueError("The provided user does not exist.")


def delete_user(id: int) -> None:
    try:
        User.objects.filter(id=id).delete()
    except User.DoesNotExist:
        raise ValueError("The provided user does not exist.")
