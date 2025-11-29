package com.polsl.backend.controller;

import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

    @PatchMapping("/activate-membership/{token}")
    public ResponseEntity<Void> activateMembership(@PathVariable UUID token) {
        userService.activateMembership(token);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
