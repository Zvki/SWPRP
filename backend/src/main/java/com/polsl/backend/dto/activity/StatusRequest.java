package com.polsl.backend.dto.activity;

import com.polsl.backend.enums.ProjectStatus;

import java.util.UUID;

public record StatusRequest(
        UUID id,
        ProjectStatus status
) {
}
