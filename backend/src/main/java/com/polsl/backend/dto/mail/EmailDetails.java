package com.polsl.backend.dto.mail;

public record EmailDetails(
        String to,
        String subject,
        String content,
        Boolean isHtml
) {
}
