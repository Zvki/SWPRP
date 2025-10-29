package com.polsl.backend.controller;

import com.polsl.backend.dto.UserRequest;
import com.polsl.backend.dto.UserResponse;
import com.polsl.backend.service.AuthService;
import com.polsl.backend.utils.JwtCookieService;
import com.polsl.backend.utils.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtCookieService jwtCookieService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(HttpServletResponse response,
                                                 @RequestBody UserRequest user) {
        var result = authService.register(user);
        jwtCookieService.setCookie(response, jwtService.generateToken(result));
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.fromUser(result));
    }
}
