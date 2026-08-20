package com.ecommerce.payment.service;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderClientService {

  @Value("${order.service.url:http://localhost:5000}")
  private String orderServiceUrl;

  private final RestTemplate restTemplate;

  public OrderClientService() {
    this.restTemplate = new RestTemplate();
  }

  public void updateOrderStatusToRefundedBySessionId(String sessionId) {
    try {
      // 1. Get order by stripe session ID
      String getUrl = orderServiceUrl + "/api/v1/orders/stripe-session/" + sessionId;
      ResponseEntity<Map> response = restTemplate.getForEntity(getUrl, Map.class);

      if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
        Map data = (Map) response.getBody().get("data");
        if (data != null && data.get("id") != null) {
          String orderId = data.get("id").toString();

          // 2. Put order status
          String putUrl = orderServiceUrl + "/api/v1/orders/" + orderId;
          HttpHeaders headers = new HttpHeaders();
          headers.set("Content-Type", "application/json");

          String body = "{\"status\": \"REFUNDED\"}";
          HttpEntity<String> request = new HttpEntity<>(body, headers);

          restTemplate.exchange(putUrl, HttpMethod.PUT, request, Void.class);
        }
      }
    } catch (Exception e) {
      System.err.println(
          "Failed to update order status for session " + sessionId + ": " + e.getMessage());
    }
  }
}
