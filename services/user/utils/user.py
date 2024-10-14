from user.models import EcommerceUser, EcommerceUserOutput


def extract_user(user: EcommerceUser) -> dict:
    user_output = EcommerceUserOutput(
        id=user.id,
        first_name=user.first_name,
        last_name=user.last_name,
        username=user.username,
        email=user.email,
    )
    user_output_dict = user_output.to_dict()
    return user_output_dict
