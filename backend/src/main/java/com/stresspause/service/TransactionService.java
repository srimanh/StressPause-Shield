package com.stresspause.service;

import com.stresspause.dto.request.TransactionRequest;
import com.stresspause.dto.response.TransactionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TransactionService {
    TransactionResponse createTransaction(TransactionRequest request);

    Page<TransactionResponse> getAllTransactions(Pageable pageable);

    TransactionResponse getTransactionById(UUID id);

    TransactionResponse updateTransaction(UUID id, TransactionRequest request);

    void deleteTransaction(UUID id);
}
