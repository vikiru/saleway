from utils.user import extract_user

from .models import EcommerceUser, EcommerceUserInput, ServiceResponse


def create_user(first_name, last_name, username, email, password) -> ServiceResponse:
    try:
        if get_user_by_email(email) or get_user_by_username(username):
            return ServiceResponse(
                data={},
                error='User already exists. Please enter a different username or email.',
            )

        user = EcommerceUser.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password,
        )
        data = extract_user(user)
        return ServiceResponse(data=data, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def modify_user(id: int, updated_user: EcommerceUserInput) -> ServiceResponse:
    try:
        user = EcommerceUser.objects.filter(id=id).first()
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


def remove_user(id: int) -> ServiceResponse:
    try:
        user = EcommerceUser.objects.filter(id=id).first()

        if not user:
            return ServiceResponse(data={}, error='User not found')

        user.delete()

        return ServiceResponse(data={}, error='')
    except Exception as e:
        return ServiceResponse(data={}, error=str(e))


def get_user_by_id(id: int) -> EcommerceUser:
    return EcommerceUser.objects.filter(id=id).first()


def get_user_by_username(username: str) -> EcommerceUser:
    return EcommerceUser.objects.filter(username=username).first()


def get_user_by_email(email: str) -> EcommerceUser:
    return EcommerceUser.objects.filter(email=email).first()
