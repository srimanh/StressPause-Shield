package com.stresspause.service;

import com.stresspause.dto.response.CategoryBreakdownResponse;
import com.stresspause.dto.response.FinancialSummaryResponse;
import com.stresspause.dto.response.MonthlyBreakdownResponse;

import java.util.List;

public interface AnalyticsService {
    FinancialSummaryResponse getFinancialSummary();

    List<MonthlyBreakdownResponse> getMonthlyBreakdown(int year);

    List<CategoryBreakdownResponse> getCategoryBreakdown();
}
