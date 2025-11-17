package com.polsl.backend.dto.activity;

import java.util.UUID;

public record CommentRequest(
        String content,
        UUID projectId,
        UUID parentId
) {
}
