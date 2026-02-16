package com.stresspause.controller;

import com.stresspause.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/health")
public class HealthController {

    @GetMapping
    public ApiResponse<String> checkHealth() {
        log.info("REST request to check health status");
        return ApiResponse.success("StressPause Backend is up and running!", "Health check successful");
    }
}
