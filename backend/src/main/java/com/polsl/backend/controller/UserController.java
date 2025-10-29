package com.polsl.backend.controller;

import com.polsl.backend.dto.UserResponse;
import com.polsl.backend.models.User;
import com.polsl.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping
    public ResponseEntity<UserResponse> get(@AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.OK).body(UserResponse.fromUser(user));
    }
}
