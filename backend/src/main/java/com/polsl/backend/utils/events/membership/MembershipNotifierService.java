package com.polsl.backend.utils.events.membership;

import com.polsl.backend.dto.mail.EmailDetails;
import com.polsl.backend.models.ProjectMembership;
import com.polsl.backend.service.EmailService;
import com.polsl.backend.utils.MailTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class MembershipNotifierService {

    private final EmailService emailService;

    @Async
    @EventListener
    public void handleNewMembershipEvent(NewMembershipEvent event) {
        final var membership = event.getMembership();
        final var recipient = membership.getStudent().getEmail();

        final var subject = createSubject(membership);
        final var content = MailTemplate.buildMembershipActivationEmail(membership);

        var data = new EmailDetails(Collections.singleton(recipient), subject, content, true);

        emailService.sendEmail(data);
    }

    private String createSubject(ProjectMembership membership) {
        return String.format("Zaproszenie do projektu %s",
                membership.getProject().getTitle());
    }
}
