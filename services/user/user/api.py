from ninja import NinjaAPI
from ninja.security import django_auth
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from .services import (
    create_user,
    get_user_by_id,
    modify_user,
    remove_user,
)
from .models import EcommerceUserInput, EcommerceUserOutput, UserCredentials

api = NinjaAPI(csrf=True)


@api.post("/users")
def post_user(request, payload: EcommerceUserInput) -> None:
    first_name, last_name, user_name, email, password = payload
    user = create_user(first_name, last_name, user_name, email, password)
    return {"message": f"User successfully created with id ${user.id}"}


@api.get("/users/{user_id}", response=EcommerceUserOutput, auth=django_auth)
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


@api.get("/auth/csrf-token")
def retrieve_csrf_token(request):
    return {"csrf_token": get_token(request)}


@api.post("/auth/login")
def handle_login(request, payload: UserCredentials):
    user = authenticate(request, username=payload.email, password=payload.password)
    if user:
        login(request, user)
        return {"success": True, "message": "User successfully logged in."}
    return {"success": False, "message": "Invalid credentials"}


def handle_logout(request):
    logout(request)
    return {"message": "Successfully logged out user."}
