package com.ecommerce.payment.dto;

public class VerifySessionRequest {
  private String sessionId;

  public String getSessionId() {
    return sessionId;
  }

  public void setSessionId(String sessionId) {
    this.sessionId = sessionId;
  }
}
