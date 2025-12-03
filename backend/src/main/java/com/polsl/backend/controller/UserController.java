package com.polsl.backend.controller;

import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/activate-membership/{token}")
    public ResponseEntity<String> activateMembership(@PathVariable UUID token) {
        userService.activateMembership(token);

        String html = """
                <html>
                <body style='font-family: Arial; text-align: center; padding: 50px;'>
                    <h2>Membership is activated</h2>
                    <p>Now you can go to application</p>
                    <a href="http://localhost:4200/dashboard" 
                       style="padding: 10px 20px;
                              background: #4CAF50; 
                              color: #fff;
                              text-decoration: none;
                              border-radius: 6px;">
                        Go to app
                    </a>
                </body>
                </html>
                """;

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.TEXT_HTML)
                .body(html);
    }
}
