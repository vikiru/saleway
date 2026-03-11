package com.ecommerce.payment.controller;

import com.ecommerce.payment.dto.ApiResponse;
import com.ecommerce.payment.dto.CheckoutSessionRequest;
import com.ecommerce.payment.dto.CheckoutSessionResponse;
import com.ecommerce.payment.dto.VerifySessionRequest;
import com.ecommerce.payment.dto.VerifySessionResponse;
import com.ecommerce.payment.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/checkout")
public class CheckoutController {

  @Autowired private CheckoutService checkoutService;

  @PostMapping("/create-session")
  public ResponseEntity<ApiResponse<CheckoutSessionResponse>> createSession(
      @RequestBody CheckoutSessionRequest request) {
    try {
      CheckoutSessionResponse response = checkoutService.createCheckoutSession(request);
      return ResponseEntity.ok(ApiResponse.success(response));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(ApiResponse.error("invalid_request", e.getMessage()));
    } catch (Exception e) {
      return ResponseEntity.badRequest()
          .body(ApiResponse.error("checkout_session_failed", e.getMessage()));
    }
  }

  @PostMapping("/verify")
  public ResponseEntity<ApiResponse<VerifySessionResponse>> verifySession(
      @RequestBody VerifySessionRequest request) {
    try {
      VerifySessionResponse response = checkoutService.verifySession(request.getSessionId());
      return ResponseEntity.ok(ApiResponse.success(response));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(ApiResponse.error("invalid_request", e.getMessage()));
    } catch (IllegalStateException e) {
      return ResponseEntity.badRequest()
          .body(ApiResponse.error("invalid_session_state", e.getMessage()));
    } catch (Exception e) {
      return ResponseEntity.badRequest()
          .body(ApiResponse.error("verify_session_failed", e.getMessage()));
    }
  }
}
