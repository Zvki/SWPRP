package com.polsl.backend.dto.project;

import java.util.List;
import java.util.UUID;

public record ProjectCreation(
        String title,
    String description,
    UUID supervisorId,
    List<String> emailInvites
) {
}
