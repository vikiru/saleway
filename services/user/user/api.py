from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from ninja import NinjaAPI
from ninja.security import django_auth

from .models import (
    ApiResponse,
    EcommerceUserInput,
    EcommerceUserOutput,
    UserCredentials,
)
from .services import (
    create_user,
    get_user_by_id,
    modify_user,
    remove_user,
)

api = NinjaAPI()


@api.post('/users')
def post_user(request, payload: EcommerceUserInput) -> None:
    try:
        payload_dict = payload.dict()

        if any(field is None or field == '' for field in payload_dict.values()):
            return ApiResponse(
                message='Please ensure that you properly provide all values.',
                data={},
                error='All fields are required.',
                status=400,
                success=False,
            )

        response = create_user(
            payload.first_name,
            payload.last_name,
            payload.username,
            payload.email,
            payload.password,
        )

        if response.error:
            return ApiResponse(
                message='User creation failed.',
                data={},
                status=500,
                success=False,
                error=response.error,
            )
        else:
            return ApiResponse(
                message='User successfully created.',
                data=response.data,
                status=201,
                success=True,
                error='No errors occured.',
            )
    except Exception as e:
        return ApiResponse(
            message='User creation failed.',
            data={},
            error=str(e),
            status=500,
            success=False,
        )


@api.get('/users/{user_id}', auth=django_auth)
def get_user(request, user_id: int) -> ApiResponse:
    try:
        user = get_user_by_id(user_id)

        if request.user.id != user_id:
            return ApiResponse(
                message='Permission denied.',
                data={},
                error='You do not have permission to access this user.',
                status=403,
                success=False,
            )

        if not user:
            return ApiResponse(
                message='User not found.',
                data={},
                error='User not found.',
                status=404,
                success=False,
            )

        user_data = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email,
        }

        return ApiResponse(
            message='User successfully retrieved.',
            data=user_data,
            error='No errors occurred.',
            status=200,
            success=True,
        )
    except Exception as e:
        return ApiResponse(
            message='User retrieval failed.',
            data={},
            error=str(e),
            status=500,
            success=False,
        )


@api.put('/users/{user_id}', auth=django_auth)
@csrf_exempt
def update_user(request, user_id: int, payload: EcommerceUserInput) -> EcommerceUserOutput:
    try:
        if request.user.id != user_id:
            return ApiResponse(
                message='Permission denied.',
                data={},
                error='You do not have permission to access this user.',
                status=403,
                success=False,
            )

        payload_dict = payload.dict()

        if all(field is None or field == '' for field in payload_dict.values()):
            return ApiResponse(
                message='No fields provided for update.',
                data={},
                error='At least one field must have a value to proceed with the update.',
                status=400,
                success=False,
            )

        response = modify_user(user_id, payload)

        if response.error:
            return ApiResponse(
                message='User update failed.',
                data={},
                error=response.error,
                status=500,
                success=False,
            )
        else:
            return ApiResponse(
                message='User successfully updated.',
                data=response.data,
                error='No errors occured.',
                status=200,
                success=True,
            )
    except Exception as e:
        return ApiResponse(
            message='User update failed.',
            data={},
            error=str(e),
            status=500,
            success=False,
        )


@api.delete('/users/{user_id}', auth=django_auth)
@csrf_exempt
def delete_user(request, user_id: int) -> None:
    try:
        if request.user.id != user_id:
            return ApiResponse(
                message='Permission denied.',
                data={},
                error='You do not have permission to access this user.',
                status=403,
                success=False,
            )
        response = remove_user(user_id)

        if response.error:
            return ApiResponse(
                message='User deletion failed.',
                data={},
                error=response.error,
                status=500,
                success=False,
            )
        else:
            return ApiResponse(
                message='User successfully deleted.',
                data={},
                error='No errors occured.',
                status=200,
                success=True,
            )
    except Exception as e:
        return ApiResponse(
            message='User deletion failed.',
            data={},
            error=str(e),
            status=500,
            success=False,
        )


@api.post('/auth/login')
def handle_login(request, payload: UserCredentials):
    try:
        user = authenticate(request, username=payload.email, password=payload.password)
        if user:
            login(request, user)
            return ApiResponse(
                message='User successfully logged in.',
                data={},
                error='No errors occured.',
                status=200,
                success=True,
            )
        return ApiResponse(
            message='Invalid credentials.',
            data={},
            error='User credentials are invalid.',
            status=401,
            success=False,
        )
    except Exception as e:
        return ApiResponse(
            message='User login failed.',
            data={},
            error=str(e),
            status=500,
            success=False,
        )


@api.post('/auth/logout')
def handle_logout(request):
    try:
        logout(request)
        return ApiResponse(
            message='User successfully logged out.',
            data={},
            error='No errors occured.',
            status=200,
            success=True,
        )
    except Exception as e:
        return ApiResponse(
            message='User logout failed.',
            data={},
            error=str(e),
            status=500,
            success=False,
        )
