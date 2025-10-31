package com.polsl.backend.dto.user;

import com.polsl.backend.enums.UserRole;
import com.polsl.backend.models.User;

import java.util.UUID;

public record UserResponse(
       UUID id,
       String firstName,
       String lastName,
       String email,
       UserRole role
) {
    public static UserResponse fromUser(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(), // lub user.getUsername()
                user.getRole()
        );
    }
}
