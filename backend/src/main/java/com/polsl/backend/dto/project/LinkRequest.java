package com.polsl.backend.dto.project;

import java.util.UUID;

public record LinkRequest(
        UUID projectId,
        String url
) {
}
