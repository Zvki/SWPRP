package com.polsl.backend.dto.activity.file;

import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public record FileRequest(
        UUID projectId,
        MultipartFile file,
        String content
) {
}
