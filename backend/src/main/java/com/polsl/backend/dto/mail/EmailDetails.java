package com.polsl.backend.dto.mail;

import java.util.Set;

public record EmailDetails(
        Set<String> recipients,
        String subject,
        String content,
        Boolean isHtml
) {
}
