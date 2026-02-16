package com.stresspause.controller;

import com.stresspause.dto.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/health")
@Tag(name = "System", description = "System health and status endpoints")
public class HealthController {

    @GetMapping
    @Operation(summary = "Check health status", description = "Verifies if the backend service is running")
    public ApiResponse<String> checkHealth() {
        log.info("REST request to check health status");
        return ApiResponse.success("StressPause Backend is up and running!", "Health check successful");
    }
}
