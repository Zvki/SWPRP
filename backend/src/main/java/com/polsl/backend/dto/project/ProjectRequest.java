package com.polsl.backend.dto.project;

public record ProjectRequest(
        String title,
        String description,
        String supervisorId
) {
}