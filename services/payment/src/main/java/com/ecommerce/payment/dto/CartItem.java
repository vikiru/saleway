package com.ecommerce.payment.dto;

public class CartItem {
  private String name;
  private String description;
  private Long unitAmount;
  private String currency;
  private Long quantity;
  private String image;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Long getUnitAmount() {
    return unitAmount;
  }

  public void setUnitAmount(Long unitAmount) {
    this.unitAmount = unitAmount;
  }

  public String getCurrency() {
    return currency;
  }

  public void setCurrency(String currency) {
    this.currency = currency;
  }

  public Long getQuantity() {
    return quantity;
  }

  public void setQuantity(Long quantity) {
    this.quantity = quantity;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}
