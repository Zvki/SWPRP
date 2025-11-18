package com.polsl.backend.dto.activity;

import com.polsl.backend.models.activities.Activity;

import java.time.LocalDateTime;
import java.util.UUID;

public record ActivityResponse(
        UUID id,
        UUID projectId,
        LocalDateTime createdAt,
        ActivityReferenceResponse reference
) {

    public static ActivityResponse fromActivity(Activity activity) {

        return new ActivityResponse(activity.getId(),
                activity.getProject().getId(),
                activity.getCreatedAt(),
                ActivityReferenceResponse.fromActivityReference(activity.getReference()));
    }
}
