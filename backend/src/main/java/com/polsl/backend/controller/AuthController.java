package com.polsl.backend.controller;

import com.polsl.backend.dto.user.UserLogin;
import com.polsl.backend.dto.user.UserRegister;
import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.service.AuthService;
import com.polsl.backend.utils.JwtCookieService;
import com.polsl.backend.utils.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtCookieService jwtCookieService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(HttpServletResponse response,
                                                 @RequestBody UserRegister user) {
        var result = authService.register(user);
        jwtCookieService.setCookie(response, jwtService.generateToken(result));
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.fromUser(result));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(HttpServletResponse response,
                                              @RequestBody UserLogin user) {
        var result = authService.login(user);
        jwtCookieService.setCookie(response, jwtService.generateToken(result));
        return ResponseEntity.status(HttpStatus.OK).body(UserResponse.fromUser(result));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        jwtCookieService.clearCookie(response);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
