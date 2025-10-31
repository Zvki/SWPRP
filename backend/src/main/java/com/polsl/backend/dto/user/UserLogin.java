package com.polsl.backend.dto.user;

public record UserLogin(
        String email,
        String password
) {
}
