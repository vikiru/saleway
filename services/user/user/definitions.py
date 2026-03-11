from typing import TypeVar

from ninja import Schema

T = TypeVar('T')


class SuccessResponse[T](Schema):
    success: bool
    message: str
    data: T


class ErrorResponse(Schema):
    success: bool
    error: str


class ServiceResponse[T]:
    def __init__(self, data: T = None, error: str = ''):
        self.data = data
        self.error = error
