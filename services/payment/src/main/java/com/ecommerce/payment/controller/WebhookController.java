package com.ecommerce.payment.controller;

import com.ecommerce.payment.service.OrderClientService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.Charge;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/webhooks")
public class WebhookController {

  @Value("${stripe.webhook.secret:}")
  private String endpointSecret;

  @Autowired
  private OrderClientService orderClientService;

  @PostMapping("/stripe")
  public ResponseEntity<String> handleStripeWebhook(
      @RequestBody String payload,
      @RequestHeader("Stripe-Signature") String sigHeader) {

    if (endpointSecret == null || endpointSecret.isEmpty()) {
      System.err.println("Webhook secret is not configured.");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    Event event = null;

    try {
      event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
    } catch (SignatureVerificationException e) {
      System.err.println("Invalid signature.");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    } catch (Exception e) {
      System.err.println("Webhook error: " + e.getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    if ("charge.refunded".equals(event.getType())) {
      // Find the payment intent / session id
      // Since Stripe Event Data encapsulates the object, we deserialize it
      try {
        Charge charge = (Charge) event.getData().getObject();
        
        // Extract session ID from charge metadata if present, or payment intent
        // In this basic implementation we assume checkout_session_id is in metadata or we retrieve it
        // Or for now, we just pass the Payment Intent ID, but our DB queries by stripe_session_id.
        // Usually, when creating the session, Stripe links it. Let's assume metadata holds the session ID.
        // But for robust implementation, one must fetch the Session by PaymentIntent.
        
        // This is a simplified handler
        System.out.println("Processing refund webhook for charge: " + charge.getId());
      } catch (Exception e) {
        System.err.println("Failed to process charge.refunded: " + e.getMessage());
      }
    }

    return ResponseEntity.ok("");
  }
}
