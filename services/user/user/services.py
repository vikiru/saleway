from models import User
from utils import hash_password, validate_password

def create_user(first_name, last_name, user_name, email, password) -> None:
    hashed_password = hash_password(password)
    User.objects.create(
        first_name=first_name,
        last_name=last_name,
        user_name=user_name,
        email=email,
        password=hashed_password,
    )


def get_user(id: int) -> User:
    return User.objects.get(id=id)


def update_user(id: int, user: User) -> None:
    User.objects.filter(id=id).update(user=user)


def delete_user(id: int) -> None:
    User.objects.filter(id=id).delete()
