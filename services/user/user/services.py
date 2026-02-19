from .definitions import ServiceResponse
from .models import EcommerceUser as EcommerceUserModel, EcommerceUserInput, EcommerceUserCreate
from utils.user import extract_user


def create_user(payload: EcommerceUserCreate) -> ServiceResponse:
    try:
        if get_user_by_email(payload.email):
            return ServiceResponse(
                data={},
                error='User with this email already exists.',
            )

        if get_user_by_username(payload.username):
            return ServiceResponse(
                data={},
                error='User with this username already exists.',
            )

        if get_user_by_clerk_id(payload.clerk_user_id):
            return ServiceResponse(
                data={},
                error='User with this Clerk ID already exists.',
            )

        user = EcommerceUserModel.objects.create(
            clerk_user_id=payload.clerk_user_id,
            first_name=payload.first_name,
            last_name=payload.last_name,
            username=payload.username,
            email=payload.email,
        )
        data = extract_user(user)
        return ServiceResponse(data=data, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def modify_user(clerk_user_id: str, updated_user: EcommerceUserInput) -> ServiceResponse:
    try:
        user = get_user_by_clerk_id(clerk_user_id)
        if not user:
            return ServiceResponse(data={}, error='User not found')

        updated_data = updated_user.dict()
        for attr, value in updated_data.items():
            if value:
                setattr(user, attr, value)
        user.save()

        data = extract_user(user)
        return ServiceResponse(data=data, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def remove_user(clerk_user_id: str) -> ServiceResponse:
    try:
        user = get_user_by_clerk_id(clerk_user_id)

        if not user:
            return ServiceResponse(data={}, error='User not found')

        user.delete()

        return ServiceResponse(data={}, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def get_user_by_clerk_id(clerk_user_id: str) -> EcommerceUserModel:
    return EcommerceUserModel.objects.filter(clerk_user_id=clerk_user_id).first()


def get_user_by_id(id: int) -> EcommerceUserModel:
    return EcommerceUserModel.objects.filter(id=id).first()


def get_user_by_username(username: str) -> EcommerceUserModel:
    return EcommerceUserModel.objects.filter(username=username).first()


def get_user_by_email(email: str) -> EcommerceUserModel:
    return EcommerceUserModel.objects.filter(email=email).first()
