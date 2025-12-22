package com.ecommerce.payment.dto;

public class VerifySessionResponse {
  private String sessionId;
  private String paymentIntentId;
  private Long amount;
  private String currency;
  private String status;

  public VerifySessionResponse(
      String sessionId, String paymentIntentId, Long amount, String currency, String status) {
    this.sessionId = sessionId;
    this.paymentIntentId = paymentIntentId;
    this.amount = amount;
    this.currency = currency;
    this.status = status;
  }

  public String getSessionId() {
    return sessionId;
  }

  public void setSessionId(String sessionId) {
    this.sessionId = sessionId;
  }

  public String getPaymentIntentId() {
    return paymentIntentId;
  }

  public void setPaymentIntentId(String paymentIntentId) {
    this.paymentIntentId = paymentIntentId;
  }

  public Long getAmount() {
    return amount;
  }

  public void setAmount(Long amount) {
    this.amount = amount;
  }

  public String getCurrency() {
    return currency;
  }

  public void setCurrency(String currency) {
    this.currency = currency;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
