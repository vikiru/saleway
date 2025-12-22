package com.ecommerce.payment.dto;

public class ApiResponse<T> {
  private boolean success;
  private T data;
  private ErrorResponse error;

  public static <T> ApiResponse<T> success(T data) {
    ApiResponse<T> response = new ApiResponse<>();
    response.success = true;
    response.data = data;
    return response;
  }

  public static <T> ApiResponse<T> error(String code, String message) {
    ApiResponse<T> response = new ApiResponse<>();
    response.success = false;
    response.error = new ErrorResponse(code, message);
    return response;
  }

  public boolean isSuccess() {
    return success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }

  public ErrorResponse getError() {
    return error;
  }

  public void setError(ErrorResponse error) {
    this.error = error;
  }
}
