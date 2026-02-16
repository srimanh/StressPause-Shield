package com.stresspause.service.impl;

import com.stresspause.dto.response.UserProfileResponse;
import com.stresspause.entity.User;
import com.stresspause.exception.ResourceNotFoundException;
import com.stresspause.repository.UserRepository;
import com.stresspause.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserProfileResponse getCurrentUserProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("[{}] - Fetching user profile", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("[{}] - Profile fetch failed: User not found", email);
                    return new ResourceNotFoundException("User not found with email: " + email);
                });

        log.info("[{}] - Profile fetched successfully", email);

        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
