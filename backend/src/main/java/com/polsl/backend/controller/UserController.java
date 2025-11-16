package com.polsl.backend.controller;

import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/supervisors")
    public ResponseEntity<List<UserResponse>> getSupervisors() {
        var response = userService.getSupervisors();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
