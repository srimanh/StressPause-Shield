package com.stresspause.controller;

import com.stresspause.dto.request.TransactionRequest;
import com.stresspause.dto.response.ApiResponse;
import com.stresspause.dto.response.TransactionResponse;
import com.stresspause.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@Tag(name = "Transactions", description = "Endpoints for managing financial transactions")
@SecurityRequirement(name = "Bearer Authentication")
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    @Operation(summary = "Create transaction", description = "Creates a new financial transaction for the authenticated user")
    public ResponseEntity<ApiResponse<TransactionResponse>> createTransaction(
            @Valid @RequestBody TransactionRequest request) {
        log.info("REST request to create transaction");
        return ResponseEntity.ok(ApiResponse.success(
                transactionService.createTransaction(request),
                "Transaction created successfully"));
    }

    @GetMapping
    @Operation(summary = "Get all transactions", description = "Retrieves a paginated list of transactions for the authenticated user")
    public ResponseEntity<ApiResponse<Page<TransactionResponse>>> getAllTransactions(
            @PageableDefault(size = 10, sort = "transactionDate") Pageable pageable) {
        log.info("REST request to get all transactions");
        return ResponseEntity.ok(ApiResponse.success(
                transactionService.getAllTransactions(pageable),
                "Transactions retrieved successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get transaction by ID", description = "Retrieves a specific transaction by its UUID")
    public ResponseEntity<ApiResponse<TransactionResponse>> getTransactionById(@PathVariable UUID id) {
        log.info("REST request to get transaction by ID: {}", id);
        return ResponseEntity.ok(ApiResponse.success(
                transactionService.getTransactionById(id),
                "Transaction retrieved successfully"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update transaction", description = "Updates an existing transaction for the authenticated user")
    public ResponseEntity<ApiResponse<TransactionResponse>> updateTransaction(
            @PathVariable UUID id,
            @Valid @RequestBody TransactionRequest request) {
        log.info("REST request to update transaction ID: {}", id);
        return ResponseEntity.ok(ApiResponse.success(
                transactionService.updateTransaction(id, request),
                "Transaction updated successfully"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete transaction", description = "Deletes a specific transaction for the authenticated user")
    public ResponseEntity<ApiResponse<Void>> deleteTransaction(@PathVariable UUID id) {
        log.info("REST request to delete transaction ID: {}", id);
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Transaction deleted successfully"));
    }
}
