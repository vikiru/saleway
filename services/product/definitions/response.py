from typing import TypeVar

from pydantic import BaseModel

T = TypeVar('T')


class SuccessResponse[T](BaseModel):
    success: bool
    message: str
    data: T


class ErrorResponse(BaseModel):
    success: bool
    error: str


ServiceResponse = SuccessResponse[T] | ErrorResponse
