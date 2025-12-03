package com.polsl.backend.utils;

import com.polsl.backend.models.ProjectMembership;
import com.polsl.backend.models.activities.Activity;

public class MailTemplate {

    private MailTemplate() {
        throw new IllegalStateException("Utility class");
    }

    public static String generateActivityNotificationHtml(final Activity activity) {
        String authorName = activity.getReference().getAuthor().getFirstName() + " " + activity.getReference().getAuthor().getLastName();
        String projectName = activity.getProject().getTitle();
        String activityType = activity.getReference().getType().name();

        return """
                <html>
                <body style="font-family: Arial, sans-serif;">
                    <h2>Nowa aktywność w projekcie %s</h2>
                
                    <p>Cześć,</p>
                    <p><strong>%s</strong> dodał nową aktywność <strong>%s</strong> do twojego projektu.</p>
                
                    <a href="http://localhost:4200/project/%s" 
                       style="display: inline-block;
                              padding: 12px 20px;
                              background-color: #4CAF50;
                              color: white;
                              text-decoration: none;
                              font-weight: bold;
                              border-radius: 6px;">
                        Przejdź do projektu
                    </a>
                
                    <hr>
                    <p style="font-size: 12px; color: #777;">
                        Ten email został wygenerowany automatycznie – prosimy na niego nie odpowiadać.
                    </p>
                </body>
                </html>
                """.formatted(
                projectName,
                authorName,
                activityType,
                activity.getProject().getId()
        );
    }

    public static String buildMembershipActivationEmail(final ProjectMembership membership) {

        final var project = membership.getProject();
        final var token = membership.getInvitationToken();
        final var activationUrl = "http://localhost:8081/swprp/user/activate-membership/" + token;

        return """
                <html>
                <body style="font-family: Arial, sans-serif;">
                    <h2>Aktywacja członkostwa w projekcie %s</h2>
                
                    <p>Cześć,</p>
                    <p>Zostałeś dodany do projektu <strong>%s</strong>.</p>
                    <p>Aby potwierdzić swoje członkostwo, kliknij w poniższy przycisk:</p>
                
                    <a href="%s" 
                       style="display: inline-block;
                              padding: 12px 20px;
                              background-color: #4CAF50;
                              color: white;
                              text-decoration: none;
                              font-weight: bold;
                              border-radius: 6px;">
                        Akceptuj członkostwo
                    </a>
                
                    <p>Jeśli to nie Ty inicjowałeś tę akcję, możesz zignorować tę wiadomość.</p>
                
                    <hr>
                    <p style="font-size: 12px; color: #777;">
                        Ten email został wygenerowany automatycznie – prosimy na niego nie odpowiadać.
                    </p>
                </body>
                </html>
                """.formatted(
                project.getTitle(),
                project.getTitle(),
                activationUrl
        );
    }

}
