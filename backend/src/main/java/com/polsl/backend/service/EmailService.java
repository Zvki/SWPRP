package com.polsl.backend.service;

import com.polsl.backend.dto.mail.EmailDetails;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final String mailFrom = "swprp@server.com";
    private final JavaMailSender mailSender;

    public void sendEmail(EmailDetails details) {
        try {
            final var message = mailSender.createMimeMessage();
            final var helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(mailFrom);
            helper.setTo(details.to());
            helper.setSubject(details.subject());
            helper.setText(details.content(), details.isHtml());

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

}
