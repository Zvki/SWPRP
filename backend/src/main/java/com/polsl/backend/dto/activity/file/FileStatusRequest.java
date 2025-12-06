package com.polsl.backend.dto.activity.file;

import com.polsl.backend.enums.FileStatus;

import java.util.UUID;

public record FileStatusRequest(
        UUID activityId,
        FileStatus status
) {
}
