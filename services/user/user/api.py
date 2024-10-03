from ninja import NinjaAPI
from .services import create_user, get_user, delete_user, validate_user

api = NinjaAPI()


@api.get("/user/{user_id}/")
def retrieve_user_by_id(request, user_id: int):
    response = {}
    try:
        user = get_user(user_id)
        if user:
            response["data"] = user
            response["message"] = "User retrieved successfully."
            response["error"] = False
    except ValueError:
        response["data"] = None
        response["message"] = "The provided user does not exist."
        response["error"] = True
    return response


@api.delete("/users/{user_id}/")
def delete_user_by_id(request, user_id: int):
    response = {}
    try:
        delete_user(user_id)
        response["data"] = None
        response["message"] = "User deleted successfully."
        response["error"] = False
    except ValueError:
        response["data"] = None
        response["message"] = "The provided user does not exist."
        response["error"] = True
    return response


@api.post("/users/")
def registration(
    request, first_name: str, last_name: str, user_name: str, email: str, password: str
):
    response = {}
    try:
        create_user(first_name, last_name, user_name, email, password)
        response["data"] = None
        response["message"] = "User created successfully."
        response["error"] = False
    except ValueError:
        response["data"] = None
        response["message"] = "The provided user already exists."
        response["error"] = True
    return response


@api.post("/auth/login/")
def login(request, user_name: str, password: str):
    response = {}
    try:
        user = validate_user(user_name, password)
        response["data"] = user
        response["message"] = "User logged in successfully."
        response["error"] = False
    except ValueError:
        response["data"] = None
        response["message"] = "The provided user does not exist."
        response["error"] = True
    return response
