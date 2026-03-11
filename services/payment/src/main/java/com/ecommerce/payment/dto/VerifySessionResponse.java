package com.ecommerce.payment.dto;

import java.util.Map;

public class VerifySessionResponse {
  private String sessionId;
  private String paymentIntentId;
  private Long amount;
  private String currency;
  private String status;
  private Map<String, String> metadata;

  public VerifySessionResponse(
      String sessionId,
      String paymentIntentId,
      Long amount,
      String currency,
      String status,
      Map<String, String> metadata) {
    this.sessionId = sessionId;
    this.paymentIntentId = paymentIntentId;
    this.amount = amount;
    this.currency = currency;
    this.status = status;
    this.metadata = metadata;
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

  public Map<String, String> getMetadata() {
    return metadata;
  }

  public void setMetadata(Map<String, String> metadata) {
    this.metadata = metadata;
  }
}
