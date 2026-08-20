package com.ecommerce.payment.controller;

import com.ecommerce.payment.dto.ApiResponse;
import com.ecommerce.payment.dto.RefundRequest;
import com.ecommerce.payment.dto.RefundResponse;
import com.ecommerce.payment.service.RefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/refund")
public class RefundController {

  @Autowired private RefundService refundService;

  @PostMapping("/process")
  public ResponseEntity<ApiResponse<RefundResponse>> processRefund(
      @RequestBody RefundRequest request) {
    try {
      RefundResponse response = refundService.processRefund(request);
      return ResponseEntity.ok(ApiResponse.success(response));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest()
          .body(ApiResponse.error("invalid_request", "Invalid refund request parameters."));
    } catch (Exception e) {
      return ResponseEntity.badRequest()
          .body(ApiResponse.error("refund_failed", "An unexpected error occurred during refund."));
    }
  }
}
