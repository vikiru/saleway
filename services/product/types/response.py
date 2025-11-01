from typing import Generic, TypeVar
from pydantic import BaseModel

T = TypeVar('T')


class SuccessResponse(BaseModel, Generic[T]):
    success: bool
    message: str
    data: T


class ErrorResponse(BaseModel):
    success: bool
    error: str


ServiceResponse = SuccessResponse[T] | ErrorResponse
