package com.polsl.backend.dto.activity;

import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.enums.ActivityType;
import com.polsl.backend.models.activities.ActivityReference;
import com.polsl.backend.models.activities.Comment;
import com.polsl.backend.models.activities.File;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public record ActivityReferenceResponse(
        UUID id,
        UserResponse author,
        LocalDateTime createdAt,
        ActivityType type,
        Map<String, Object> data
) {
    public static ActivityReferenceResponse fromActivityReference(ActivityReference reference) {

        if (reference instanceof Comment c) {

            Map<String, Object> data = new HashMap<>();
            data.put("content", c.getContent());
            data.put("parentReferenceId",
                    c.getParentReference() != null
                            ? c.getParentReference().getId()
                            : null
            );

            return new ActivityReferenceResponse(
                    c.getId(),
                    UserResponse.fromUser(c.getAuthor()),
                    c.getCreatedAt(),
                    ActivityType.COMMENT,
                    data
            );
        }

        if (reference instanceof File f) {
            return new ActivityReferenceResponse(
                    f.getId(),
                    UserResponse.fromUser(f.getAuthor()),
                    f.getCreatedAt(),
                    ActivityType.FILE,
                    Map.of(
                            "name", f.getName(),
                            "path", f.getPath(),
                            "url", f.getUrl()
                    )
            );
        }

        throw new IllegalArgumentException("Unknown ActivityReference type: " + reference.getClass());
    }
}
