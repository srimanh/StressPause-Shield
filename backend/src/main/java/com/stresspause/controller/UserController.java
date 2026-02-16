package com.stresspause.controller;

import com.stresspause.dto.response.ApiResponse;
import com.stresspause.dto.response.UserProfileResponse;
import com.stresspause.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getCurrentUser() {
        log.info("REST request to fetch current user profile");
        UserProfileResponse profile = userService.getCurrentUserProfile();
        return ResponseEntity.ok(ApiResponse.success(profile, "User profile retrieved successfully"));
    }
}
