from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from ninja import NinjaAPI
from ninja.security import django_auth

from .definitions import ErrorResponse, SuccessResponse
from .models import (
    EcommerceUserInput,
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
def post_user(request, payload: EcommerceUserInput) -> SuccessResponse[dict]:
    try:
        payload_dict = payload.dict()

        if any(field is None or field == '' for field in payload_dict.values()):
            return ErrorResponse(success=False, error='All fields are required.')

        response = create_user(
            payload.first_name,
            payload.last_name,
            payload.username,
            payload.email,
            payload.password,
        )

        if response.error:
            return ErrorResponse(success=False, error='User creation failed.')
        else:
            return SuccessResponse(success=True, message='User successfully created.', data=response.data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'User creation failed: {str(e)}')


@api.get('/users/{user_id}', auth=django_auth)
def get_user(request, user_id: int) -> SuccessResponse[dict]:
    try:
        user = get_user_by_id(user_id)

        if request.user.id != user_id:
            return ErrorResponse(success=False, error='You do not have permission to access this user.')

        if not user:
            return ErrorResponse(success=False, error='User not found.')

        user_data = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email,
        }

        return SuccessResponse(success=True, message='User retrieved successfully.', data=user_data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'User retrieval failed: {str(e)}')


@api.put('/users/{user_id}', auth=django_auth)
@csrf_exempt
def update_user(request, user_id: int, payload: EcommerceUserInput) -> SuccessResponse[dict]:
    try:
        if request.user.id != user_id:
            return ErrorResponse(success=False, error='You do not have permission to access this user.')

        payload_dict = payload.dict()

        if all(field is None or field == '' for field in payload_dict.values()):
            return ErrorResponse(
                success=False, error='At least one field must have a value to proceed with the update.'
            )

        response = modify_user(user_id, payload)

        if response.error:
            return ErrorResponse(success=False, error='User update failed.')
        else:
            return SuccessResponse(success=True, message='User updated successfully.', data=response.data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'User update failed: {str(e)}')


@api.delete('/users/{user_id}', auth=django_auth)
@csrf_exempt
def delete_user(request, user_id: int) -> SuccessResponse[dict]:
    try:
        if request.user.id != user_id:
            return ErrorResponse(success=False, error='You do not have permission to access this user.')
        response = remove_user(user_id)

        if response.error:
            return ErrorResponse(success=False, error='User deletion failed.')
        else:
            return SuccessResponse(success=True, message='User successfully deleted.', data={})
    except Exception as e:
        return ErrorResponse(success=False, error=f'User deletion failed: {str(e)}')


@api.post('/auth/login')
def handle_login(request, payload: UserCredentials) -> SuccessResponse[dict]:
    try:
        user = authenticate(request, username=payload.email, password=payload.password)
        if user:
            login(request, user)
            return SuccessResponse(success=True, message='Login successful.', data={'user_id': user.id})
        else:
            return ErrorResponse(success=False, error='Invalid credentials.')
    except Exception as e:
        return ErrorResponse(success=False, error=f'Login failed: {str(e)}')


@api.post('/auth/logout')
def handle_logout(request) -> SuccessResponse[dict]:
    try:
        logout(request)
        return SuccessResponse(success=True, message='User successfully logged out.', data={})
    except Exception as e:
        return ErrorResponse(success=False, error=f'Logout failed: {str(e)}')
