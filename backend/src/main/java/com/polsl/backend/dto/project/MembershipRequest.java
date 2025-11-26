package com.polsl.backend.dto.project;

import java.util.UUID;

public record MembershipRequest(
        UUID projectId,
        String email
) {
}