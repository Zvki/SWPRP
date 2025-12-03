package com.polsl.backend.dto.activity;

import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.enums.ActivityType;
import com.polsl.backend.models.activities.ActivityReference;
import com.polsl.backend.models.activities.Comment;
import com.polsl.backend.models.activities.File;
import com.polsl.backend.models.activities.Meeting;
import org.hibernate.Hibernate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public record ActivityReferenceResponse(
        UUID id,
        UserResponse author,
        String content,
        ActivityType type,
        Map<String, Object> data
) {
    public static ActivityReferenceResponse fromActivityReference(ActivityReference reference) {

        reference = Hibernate.unproxy(reference, ActivityReference.class);

        if (reference instanceof Comment c) {

            Map<String, Object> data = new HashMap<>();
            data.put("parentReferenceId",
                    c.getParentReference() != null
                            ? c.getParentReference().getId()
                            : null
            );

            return new ActivityReferenceResponse(
                    c.getId(),
                    UserResponse.fromUser(c.getAuthor()),
                    c.getContent(),
                    ActivityType.COMMENT,
                    data
            );
        }

        if (reference instanceof File f) {
            return new ActivityReferenceResponse(
                    f.getId(),
                    UserResponse.fromUser(f.getAuthor()),
                    f.getContent(),
                    ActivityType.FILE,
                    Map.of(
                            "originalName", f.getOriginalName(),
                            "name", f.getName(),
                            "url", f.getUrl()
                    )
            );
        }

        if (reference instanceof Meeting m) {
            return new ActivityReferenceResponse(
                    m.getId(),
                    UserResponse.fromUser(m.getAuthor()),
                    m.getContent(),
                    ActivityType.MEETING,
                    Map.of(
                            "title", m.getTitle(),
                            "url", m.getUrl(),
                            "date", m.getStartTime()
                    )
            );
        }

        throw new IllegalArgumentException("Unknown ActivityReference type: " + reference.getClass());
    }
}
