package com.stresspause.repository;

import com.stresspause.entity.Transaction;
import com.stresspause.entity.User;
import com.stresspause.entity.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    Page<Transaction> findByUser(User user, Pageable pageable);

    Optional<Transaction> findByIdAndUser(UUID id, User user);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.user = :user AND t.type = :type")
    BigDecimal sumAmountByUserAndType(@Param("user") User user, @Param("type") TransactionType type);

    @Query("SELECT t.category as category, SUM(t.amount) as total FROM Transaction t " +
            "WHERE t.user = :user AND t.type = 'EXPENSE' " +
            "GROUP BY t.category")
    List<Object[]> categoryAggregation(@Param("user") User user);

    @Query("SELECT MONTH(t.transactionDate) as month, " +
            "SUM(CASE WHEN t.type = 'INCOME' THEN t.amount ELSE 0 END) as income, " +
            "SUM(CASE WHEN t.type = 'EXPENSE' THEN t.amount ELSE 0 END) as expense " +
            "FROM Transaction t WHERE t.user = :user AND YEAR(t.transactionDate) = :year " +
            "GROUP BY MONTH(t.transactionDate) " +
            "ORDER BY MONTH(t.transactionDate) ASC")
    List<Object[]> monthlyAggregation(@Param("user") User user, @Param("year") int year);
}
