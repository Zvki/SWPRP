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
        ActivityType type,
        Map<String, Object> data
) {
    public static ActivityReferenceResponse fromActivityReference(ActivityReference reference) {

        reference = Hibernate.unproxy(reference, ActivityReference.class);

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
                    ActivityType.COMMENT,
                    data
            );
        }

        if (reference instanceof File f) {
            return new ActivityReferenceResponse(
                    f.getId(),
                    UserResponse.fromUser(f.getAuthor()),
                    ActivityType.FILE,
                    Map.of(
                            "name", f.getName(),
                            "content", f.getContent(),
                            "url", f.getUrl()
                    )
            );
        }

        if (reference instanceof Meeting m) {
            return new ActivityReferenceResponse(
                    m.getId(),
                    UserResponse.fromUser(m.getAuthor()),
                    ActivityType.MEETING,
                    Map.of(
                            "title", m.getTitle(),
                            "content", m.getContent(),
                            "url", m.getUrl(),
                            "date", m.getStartTime()
                    )
            );
        }

        throw new IllegalArgumentException("Unknown ActivityReference type: " + reference.getClass());
    }
}
