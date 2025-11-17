package com.polsl.backend.dto.activity;

import java.util.List;

public record ActivityListResponse(
        List<ActivityResponse> activities
) {
}
