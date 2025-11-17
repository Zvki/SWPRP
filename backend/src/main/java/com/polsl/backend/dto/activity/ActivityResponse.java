package com.polsl.backend.dto.activity;

import com.polsl.backend.dto.project.ProjectResponse;
import com.polsl.backend.models.activities.Activity;

import java.util.UUID;

public record ActivityResponse(
        UUID id,
        ProjectResponse projectResponse,
        ActivityReferenceResponse reference
) {

    public static ActivityResponse fromActivity(Activity activity) {

        return new ActivityResponse(activity.getId(),
                ProjectResponse.fromProject(activity.getProject()),
                ActivityReferenceResponse.fromActivityReference(activity.getReference()));
    }
}
