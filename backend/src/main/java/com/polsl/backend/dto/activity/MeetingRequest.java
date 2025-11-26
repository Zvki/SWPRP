package com.polsl.backend.dto.activity;

import java.time.LocalDateTime;
import java.util.UUID;

public record MeetingRequest(
        UUID projectId,
        String title,
        String content,
        String url,
        LocalDateTime meetingDate
) {
}
