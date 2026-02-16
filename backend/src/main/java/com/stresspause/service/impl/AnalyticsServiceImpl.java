package com.stresspause.service.impl;

import com.stresspause.dto.response.CategoryBreakdownResponse;
import com.stresspause.dto.response.FinancialSummaryResponse;
import com.stresspause.dto.response.MonthlyBreakdownResponse;
import com.stresspause.entity.TransactionType;
import com.stresspause.entity.User;
import com.stresspause.exception.ResourceNotFoundException;
import com.stresspause.repository.TransactionRepository;
import com.stresspause.repository.UserRepository;
import com.stresspause.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Month;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    @Override
    public FinancialSummaryResponse getFinancialSummary() {
        User user = getCurrentUser();
        BigDecimal totalIncome = transactionRepository.sumAmountByUserAndType(user, TransactionType.INCOME);
        BigDecimal totalExpense = transactionRepository.sumAmountByUserAndType(user, TransactionType.EXPENSE);
        BigDecimal netBalance = totalIncome.subtract(totalExpense);

        return FinancialSummaryResponse.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .netBalance(netBalance)
                .build();
    }

    @Override
    public List<MonthlyBreakdownResponse> getMonthlyBreakdown(int year) {
        User user = getCurrentUser();
        List<Object[]> results = transactionRepository.monthlyAggregation(user, year);

        return results.stream()
                .map(result -> MonthlyBreakdownResponse.builder()
                        .month(Month.of(((Number) result[0]).intValue()).name())
                        .income((BigDecimal) result[1])
                        .expense((BigDecimal) result[2])
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoryBreakdownResponse> getCategoryBreakdown() {
        User user = getCurrentUser();
        List<Object[]> results = transactionRepository.categoryAggregation(user);

        return results.stream()
                .map(result -> CategoryBreakdownResponse.builder()
                        .category((String) result[0])
                        .total((BigDecimal) result[1])
                        .build())
                .collect(Collectors.toList());
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
