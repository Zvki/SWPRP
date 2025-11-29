package com.polsl.backend.controller;

import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.service.AuthService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        final var user = authService.getUser(jwt);
        return ResponseEntity.status(HttpStatus.OK).body(UserResponse.fromUser(user));
    }
}
