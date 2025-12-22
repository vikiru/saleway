package com.ecommerce.payment.dto;

public class RefundResponse {
  private String refundId;
  private String paymentIntentId;
  private Long amount;
  private String status;
  private String reason;

  public RefundResponse(
      String refundId, String paymentIntentId, Long amount, String status, String reason) {
    this.refundId = refundId;
    this.paymentIntentId = paymentIntentId;
    this.amount = amount;
    this.status = status;
    this.reason = reason;
  }

  public String getRefundId() {
    return refundId;
  }

  public void setRefundId(String refundId) {
    this.refundId = refundId;
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

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getReason() {
    return reason;
  }

  public void setReason(String reason) {
    this.reason = reason;
  }
}
