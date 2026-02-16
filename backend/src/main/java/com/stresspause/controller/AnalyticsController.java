package com.stresspause.controller;

import com.stresspause.dto.response.ApiResponse;
import com.stresspause.dto.response.CategoryBreakdownResponse;
import com.stresspause.dto.response.FinancialSummaryResponse;
import com.stresspause.dto.response.MonthlyBreakdownResponse;
import com.stresspause.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@Tag(name = "Analytics", description = "Endpoints for financial insights and summaries")
@SecurityRequirement(name = "Bearer Authentication")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/summary")
    @Operation(summary = "Get financial summary", description = "Calculates total income, expense, and net balance for the user")
    public ResponseEntity<ApiResponse<FinancialSummaryResponse>> getSummary() {
        log.info("REST request to fetch financial summary");
        return ResponseEntity.ok(ApiResponse.success(
                analyticsService.getFinancialSummary(),
                "Financial summary fetched successfully"));
    }

    @GetMapping("/monthly")
    @Operation(summary = "Get monthly breakdown", description = "Retrieves income and expense totals grouped by month for a given year")
    public ResponseEntity<ApiResponse<List<MonthlyBreakdownResponse>>> getMonthlyBreakdown(
            @RequestParam(required = false) Integer year) {
        log.info("REST request to fetch monthly breakdown for year: {}", year);
        int targetYear = (year != null) ? year : LocalDate.now().getYear();
        return ResponseEntity.ok(ApiResponse.success(
                analyticsService.getMonthlyBreakdown(targetYear),
                "Monthly breakdown fetched successfully"));
    }

    @GetMapping("/categories")
    @Operation(summary = "Get category breakdown", description = "Retrieves a breakdown of expenses by category")
    public ResponseEntity<ApiResponse<List<CategoryBreakdownResponse>>> getCategoryBreakdown() {
        log.info("REST request to fetch category-wise expense breakdown");
        return ResponseEntity.ok(ApiResponse.success(
                analyticsService.getCategoryBreakdown(),
                "Category-wise expense breakdown fetched successfully"));
    }
}
