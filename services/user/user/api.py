from ninja import NinjaAPI

from services.user.user.services import (
    create_user,
    get_user_by_id,
    modify_user,
    remove_user,
)
from .models import EcommerceUserInput, EcommerceUserOutput

api = NinjaAPI()


@api.post("/users")
def post_user(request, payload: EcommerceUserInput) -> None:
    first_name, last_name, user_name, email, password = payload
    user = create_user(first_name, last_name, user_name, email, password)
    return {"message": f"User successfully created with id ${user.id}"}


@api.get("/users/{user_id}", response=EcommerceUserOutput)
def get_user(request, user_id: int) -> EcommerceUserOutput:
    user = get_user_by_id(user_id)
    return user


@api.put("/users/{user_id}")
def update_user(
    request, user_id: int, payload: EcommerceUserInput
) -> EcommerceUserOutput:
    modify_user(user_id, payload)


@api.delete("/users/{user_id}")
def delete_user(request, user_id: int) -> None:
    remove_user(user_id)
