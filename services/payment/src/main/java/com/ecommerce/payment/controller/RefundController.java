package com.ecommerce.payment.controller;

import com.ecommerce.payment.dto.ApiResponse;
import com.ecommerce.payment.dto.RefundRequest;
import com.ecommerce.payment.dto.RefundResponse;
import com.ecommerce.payment.dto.VerifySessionRequest;
import com.ecommerce.payment.dto.VerifySessionResponse;
import com.ecommerce.payment.service.RefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/refund")
public class RefundController {

  @Autowired private RefundService refundService;

  @PostMapping("/verify")
  public ResponseEntity<ApiResponse<VerifySessionResponse>> verifySession(
      @RequestBody VerifySessionRequest request) {
    try {
      VerifySessionResponse response = refundService.verifySession(request.getSessionId());
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

  @PostMapping("/process")
  public ResponseEntity<ApiResponse<RefundResponse>> processRefund(
      @RequestBody RefundRequest request) {
    try {
      RefundResponse response = refundService.processRefund(request);
      return ResponseEntity.ok(ApiResponse.success(response));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(ApiResponse.error("invalid_request", e.getMessage()));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(ApiResponse.error("refund_failed", e.getMessage()));
    }
  }
}
