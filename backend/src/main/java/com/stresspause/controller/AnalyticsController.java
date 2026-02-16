package com.stresspause.controller;

import com.stresspause.dto.response.ApiResponse;
import com.stresspause.dto.response.CategoryBreakdownResponse;
import com.stresspause.dto.response.FinancialSummaryResponse;
import com.stresspause.dto.response.MonthlyBreakdownResponse;
import com.stresspause.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<FinancialSummaryResponse>> getSummary() {
        return ResponseEntity.ok(ApiResponse.success(
                analyticsService.getFinancialSummary(),
                "Financial summary fetched successfully"));
    }

    @GetMapping("/monthly")
    public ResponseEntity<ApiResponse<List<MonthlyBreakdownResponse>>> getMonthlyBreakdown(
            @RequestParam(required = false) Integer year) {
        int targetYear = (year != null) ? year : LocalDate.now().getYear();
        return ResponseEntity.ok(ApiResponse.success(
                analyticsService.getMonthlyBreakdown(targetYear),
                "Monthly breakdown fetched successfully"));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<CategoryBreakdownResponse>>> getCategoryBreakdown() {
        return ResponseEntity.ok(ApiResponse.success(
                analyticsService.getCategoryBreakdown(),
                "Category-wise expense breakdown fetched successfully"));
    }
}
