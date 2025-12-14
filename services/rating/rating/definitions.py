from typing import Generic, TypeVar

from ninja import Schema

T = TypeVar('T')


class SuccessResponse(Schema, Generic[T]):
    success: bool
    message: str
    data: T


class ErrorResponse(Schema):
    success: bool
    error: str


ServiceResponse = SuccessResponse[T] | ErrorResponse
