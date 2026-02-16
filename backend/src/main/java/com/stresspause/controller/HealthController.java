package com.stresspause.controller;

import com.stresspause.dto.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @GetMapping
    public ApiResponse<String> checkHealth() {
        return ApiResponse.success("StressPause Backend is up and running!", "Health check successful");
    }
}
