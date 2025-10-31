package com.polsl.backend.dto;

import com.polsl.backend.enums.UserRole;

public record UserRegister(
        String firstName,
        String lastName,
        String email,
        String password,
        UserRole role
) {
}
