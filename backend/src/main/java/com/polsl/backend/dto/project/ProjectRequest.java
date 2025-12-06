package com.polsl.backend.dto.project;

import java.util.UUID;

public record ProjectRequest(
        String title,
        String description,
        UUID supervisorId
) {
}