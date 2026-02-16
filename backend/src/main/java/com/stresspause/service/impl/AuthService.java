package com.stresspause.service.impl;

import com.stresspause.config.JwtService;
import com.stresspause.dto.request.LoginRequest;
import com.stresspause.dto.request.RegisterRequest;
import com.stresspause.dto.response.AuthResponse;
import com.stresspause.entity.Role;
import com.stresspause.entity.User;
import com.stresspause.exception.BadRequestException;
import com.stresspause.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
        private final UserRepository repository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthResponse register(RegisterRequest request) {
                log.info("Attempting to register user with email: {}", request.getEmail());

                if (repository.existsByEmail(request.getEmail())) {
                        log.warn("Registration failed. Email already exists: {}", request.getEmail());
                        throw new BadRequestException("Email already exists");
                }

                var user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .enabled(true)
                                .build();

                repository.save(user);
                log.info("User registered successfully: {}", user.getEmail());

                var jwtToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .email(user.getEmail())
                                .role(user.getRole().name())
                                .build();
        }

        public AuthResponse login(LoginRequest request) {
                log.info("Attempting login for user: {}", request.getEmail());

                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));

                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow(() -> {
                                        log.error("User authenticated but not found in database: {}",
                                                        request.getEmail());
                                        return new BadRequestException("User not found");
                                });

                log.info("User logged in successfully: {}", request.getEmail());

                var jwtToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .email(user.getEmail())
                                .role(user.getRole().name())
                                .build();
        }
}
