package com.polsl.backend.dto.activity.meeting;

import java.util.UUID;

public record MeetingNoteRequest(
        String note,
        UUID activityId
) {
}
