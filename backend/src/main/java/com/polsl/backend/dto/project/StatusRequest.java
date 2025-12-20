package com.polsl.backend.dto.project;

import com.polsl.backend.enums.ProjectStatus;

import java.util.UUID;

public record StatusRequest(
        UUID id,
        ProjectStatus status
) {
}
