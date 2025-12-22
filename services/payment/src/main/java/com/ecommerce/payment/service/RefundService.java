package com.ecommerce.payment.service;

import com.ecommerce.payment.dto.RefundRequest;
import com.ecommerce.payment.dto.RefundResponse;
import com.ecommerce.payment.dto.VerifySessionResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Refund;
import com.stripe.model.checkout.Session;
import com.stripe.param.RefundCreateParams;
import com.stripe.param.RefundCreateParams.Builder;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class RefundService {

  public VerifySessionResponse verifySession(String sessionId) throws StripeException {
    if (sessionId == null || sessionId.isEmpty()) {
      throw new IllegalArgumentException("Session ID is required");
    }

    Session session = Session.retrieve(sessionId);

    if (!"complete".equals(session.getStatus())) {
      throw new IllegalStateException("Session is not complete. Status: " + session.getStatus());
    }

    String paymentIntentId = session.getPaymentIntent();
    if (paymentIntentId == null) {
      throw new IllegalStateException("No payment intent found for this session");
    }

    PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

    return new VerifySessionResponse(
        sessionId,
        paymentIntentId,
        paymentIntent.getAmount(),
        paymentIntent.getCurrency(),
        paymentIntent.getStatus());
  }

  public RefundResponse processRefund(RefundRequest request) throws StripeException {
    if (request.getPaymentIntentId() == null || request.getPaymentIntentId().isEmpty()) {
      throw new IllegalArgumentException("Payment Intent ID is required");
    }

    Builder paramsBuilder =
        RefundCreateParams.builder().setPaymentIntent(request.getPaymentIntentId());

    if (request.getAmount() != null) {
      if (request.getAmount() <= 0) {
        throw new IllegalArgumentException("Refund amount must be greater than 0");
      }
      paramsBuilder.setAmount(request.getAmount());
    }

    if (request.getReason() != null && !request.getReason().isEmpty()) {
      Map<String, String> metadata = new HashMap<>();
      metadata.put("reason", request.getReason());
      paramsBuilder.putAllMetadata(metadata);
    }

    Refund refund = Refund.create(paramsBuilder.build());

    return new RefundResponse(
        refund.getId(),
        refund.getPaymentIntent(),
        refund.getAmount(),
        refund.getStatus(),
        request.getReason());
  }
}
