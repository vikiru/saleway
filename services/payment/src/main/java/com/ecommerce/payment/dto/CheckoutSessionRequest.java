package com.ecommerce.payment.dto;

import java.util.List;
import java.util.Map;

public class CheckoutSessionRequest {
  private List<CartItem> lineItems;
  private String successUrl;
  private String cancelUrl;
  private String customerEmail;
  private Map<String, String> metadata;

  public List<CartItem> getLineItems() {
    return lineItems;
  }

  public void setLineItems(List<CartItem> lineItems) {
    this.lineItems = lineItems;
  }

  public String getSuccessUrl() {
    return successUrl;
  }

  public void setSuccessUrl(String successUrl) {
    this.successUrl = successUrl;
  }

  public String getCancelUrl() {
    return cancelUrl;
  }

  public void setCancelUrl(String cancelUrl) {
    this.cancelUrl = cancelUrl;
  }

  public String getCustomerEmail() {
    return customerEmail;
  }

  public void setCustomerEmail(String customerEmail) {
    this.customerEmail = customerEmail;
  }

  public Map<String, String> getMetadata() {
    return metadata;
  }

  public void setMetadata(Map<String, String> metadata) {
    this.metadata = metadata;
  }
}
