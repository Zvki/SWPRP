package com.polsl.backend.dto.activity;

import java.util.UUID;

public record MeetingNoteRequest(
        String note,
        UUID activityId
) {
}
