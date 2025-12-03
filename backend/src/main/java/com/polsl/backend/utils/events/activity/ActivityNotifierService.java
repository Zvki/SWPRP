package com.polsl.backend.utils.events.activity;

import com.polsl.backend.dto.mail.EmailDetails;
import com.polsl.backend.models.activities.Activity;
import com.polsl.backend.service.EmailService;
import com.polsl.backend.utils.MailTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityNotifierService {

    private final EmailService emailService;

    @Async
    @EventListener
    public void handleNewActivityEvent(NewActivityEvent event) {
        final var activity = event.getActivity();
        final var project = activity.getProject();
        final var author = activity.getReference().getAuthor();
        final var members = project.getMembers();

        Set<String> recipients = members.stream()
                .filter(m -> m.getStudent() != null && !m.getStudent().equals(author))
                .map(membership -> membership.getStudent().getEmail())
                .collect(Collectors.toSet());

        if (project.getSupervisor() != null && !project.getSupervisor().equals(author)) {
            recipients.add(project.getSupervisor().getEmail());
        }

        if (recipients.isEmpty()) return;

        String subject = createSubject(activity);
        String content = MailTemplate.generateActivityNotificationHtml(activity);

        var data = new EmailDetails(recipients, subject, content, true);

        emailService.sendEmail(data);

    }

    private String createSubject(Activity activity) {
        return String.format("Nowa aktywność (%s) w projekcie: %s",
                activity.getReference().getType().name(),
                activity.getProject().getTitle());
    }
}
