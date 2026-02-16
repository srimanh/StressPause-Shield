package com.stresspause.service.impl;

import com.stresspause.dto.request.TransactionRequest;
import com.stresspause.dto.response.TransactionResponse;
import com.stresspause.entity.Transaction;
import com.stresspause.entity.User;
import com.stresspause.exception.ResourceNotFoundException;
import com.stresspause.repository.TransactionRepository;
import com.stresspause.repository.UserRepository;
import com.stresspause.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public TransactionResponse createTransaction(TransactionRequest request) {
        User user = getCurrentUser();
        Transaction transaction = Transaction.builder()
                .amount(request.getAmount())
                .type(request.getType())
                .category(request.getCategory())
                .description(request.getDescription())
                .transactionDate(request.getTransactionDate())
                .user(user)
                .build();

        Transaction savedTransaction = transactionRepository.save(transaction);
        return mapToResponse(savedTransaction);
    }

    @Override
    public Page<TransactionResponse> getAllTransactions(Pageable pageable) {
        User user = getCurrentUser();
        return transactionRepository.findByUser(user, pageable)
                .map(this::mapToResponse);
    }

    @Override
    public TransactionResponse getTransactionById(UUID id) {
        Transaction transaction = getTransactionEntity(id);
        return mapToResponse(transaction);
    }

    @Override
    @Transactional
    public TransactionResponse updateTransaction(UUID id, TransactionRequest request) {
        Transaction transaction = getTransactionEntity(id);

        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setCategory(request.getCategory());
        transaction.setDescription(request.getDescription());
        transaction.setTransactionDate(request.getTransactionDate());

        return mapToResponse(transactionRepository.save(transaction));
    }

    @Override
    @Transactional
    public void deleteTransaction(UUID id) {
        Transaction transaction = getTransactionEntity(id);
        transactionRepository.delete(transaction);
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Transaction getTransactionEntity(UUID id) {
        User user = getCurrentUser();
        return transactionRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found or access denied"));
    }

    private TransactionResponse mapToResponse(Transaction transaction) {
        return TransactionResponse.builder()
                .id(transaction.getId())
                .amount(transaction.getAmount())
                .type(transaction.getType())
                .category(transaction.getCategory())
                .description(transaction.getDescription())
                .transactionDate(transaction.getTransactionDate())
                .createdAt(transaction.getCreatedAt())
                .updatedAt(transaction.getUpdatedAt())
                .build();
    }
}
