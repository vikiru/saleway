from ninja import NinjaAPI

from .definitions import ErrorResponse, SuccessResponse
from .models import (
    EcommerceUserCreate,
    EcommerceUserInput,
    EcommerceUserOutput,
)
from .services import (
    create_user,
    get_user_by_clerk_id,
    modify_user,
    remove_user,
)

api = NinjaAPI()


@api.post('/users')
def post_user(request, payload: EcommerceUserCreate) -> SuccessResponse[dict]:
    try:
        response = create_user(payload)

        if response.error:
            return ErrorResponse(success=False, error=response.error)
        else:
            return SuccessResponse(success=True, message='User successfully created.', data=response.data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'User creation failed: {str(e)}')


@api.get('/users/{user_id}')
def get_user(request, user_id: str) -> SuccessResponse[dict]:
    try:
        user = get_user_by_clerk_id(user_id)

        if not user:
            return ErrorResponse(success=False, error='User not found.')

        user_data = {
            'id': user.clerk_user_id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email,
        }

        return SuccessResponse(success=True, message='User retrieved successfully.', data=user_data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'User retrieval failed: {str(e)}')


@api.put('/users/{user_id}')
def update_user(request, user_id: str, payload: EcommerceUserInput) -> SuccessResponse[dict]:
    try:
        response = modify_user(user_id, payload)

        if response.error:
            return ErrorResponse(success=False, error=response.error)
        else:
            return SuccessResponse(success=True, message='User updated successfully.', data=response.data)
    except Exception as e:
        return ErrorResponse(success=False, error=f'User update failed: {str(e)}')


@api.delete('/users/{user_id}')
def delete_user(request, user_id: str) -> SuccessResponse[dict]:
    try:
        response = remove_user(user_id)

        if response.error:
            return ErrorResponse(success=False, error=response.error)
        else:
            return SuccessResponse(success=True, message='User successfully deleted.', data={})
    except Exception as e:
        return ErrorResponse(success=False, error=f'User deletion failed: {str(e)}')
