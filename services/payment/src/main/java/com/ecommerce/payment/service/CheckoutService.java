package com.ecommerce.payment.service;

import com.ecommerce.payment.dto.CartItem;
import com.ecommerce.payment.dto.CheckoutSessionRequest;
import com.ecommerce.payment.dto.CheckoutSessionResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.Builder;
import com.stripe.param.checkout.SessionCreateParams.LineItem;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData.ProductData;
import com.stripe.param.checkout.SessionCreateParams.Mode;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CheckoutService {

  public CheckoutSessionResponse createCheckoutSession(CheckoutSessionRequest request)
      throws StripeException {
    if (request.getLineItems() == null || request.getLineItems().isEmpty()) {
      throw new IllegalArgumentException("Line items cannot be empty");
    }

    List<LineItem> stripeLineItems = new ArrayList<>();
    for (CartItem item : request.getLineItems()) {
      validateCartItem(item);

      ProductData productData =
          ProductData.builder()
              .setName(item.getName())
              .setDescription(item.getDescription())
              .addImage(item.getImage())
              .build();

      PriceData priceData =
          PriceData.builder()
              .setCurrency(item.getCurrency())
              .setUnitAmount(item.getUnitAmount())
              .setProductData(productData)
              .build();

      LineItem stripeLineItem =
          LineItem.builder().setPriceData(priceData).setQuantity(item.getQuantity()).build();

      stripeLineItems.add(stripeLineItem);
    }

    Builder paramsBuilder =
        SessionCreateParams.builder()
            .setMode(Mode.PAYMENT)
            .setSuccessUrl(request.getSuccessUrl())
            .setCancelUrl(request.getCancelUrl())
            .addAllLineItem(stripeLineItems);

    if (request.getCustomerEmail() != null && !request.getCustomerEmail().isEmpty()) {
      paramsBuilder.setCustomerEmail(request.getCustomerEmail());
    }

    if (request.getMetadata() != null && !request.getMetadata().isEmpty()) {
      paramsBuilder.putAllMetadata(request.getMetadata());
    }

    Session session = Session.create(paramsBuilder.build());

    return new CheckoutSessionResponse(session.getId(), session.getUrl());
  }

  private void validateCartItem(CartItem item) {
    if (item.getName() == null || item.getName().isEmpty()) {
      throw new IllegalArgumentException("Line item name is required");
    }
    if (item.getUnitAmount() == null || item.getUnitAmount() <= 0) {
      throw new IllegalArgumentException("Unit amount must be greater than 0");
    }
    if (item.getQuantity() == null || item.getQuantity() <= 0) {
      throw new IllegalArgumentException("Quantity must be greater than 0");
    }
    if (item.getCurrency() == null || item.getCurrency().isEmpty()) {
      throw new IllegalArgumentException("Currency is required");
    }
  }
}
