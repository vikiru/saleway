package com.ecommerce.payment.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {

  @Value("${stripe.api.key}")
  private String stripeApiKey;

  @Value("${stripe.test.mode:true}")
  private boolean testMode;

  @PostConstruct
  public void setup() {
    if (testMode && !stripeApiKey.startsWith("sk_test_")) {
      throw new IllegalStateException(
          "Stripe is in test mode but the API key provided is not a test key (sk_test_).");
    }
    Stripe.apiKey = stripeApiKey;
  }
}
