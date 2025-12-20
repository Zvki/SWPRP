package com.polsl.backend.dto.activity.comment;

import java.util.UUID;

public record CommentRequest(
        String content,
        UUID projectId,
        UUID parentId
) {
}
