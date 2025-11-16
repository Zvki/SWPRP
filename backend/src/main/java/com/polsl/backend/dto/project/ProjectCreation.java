package com.polsl.backend.dto.project;

import com.polsl.backend.dto.user.UserResponse;

import java.util.List;

public record ProjectCreation(
        String title,
    String description,
    UserResponse supervisor,
    List<String> emailInvites
) {
}
