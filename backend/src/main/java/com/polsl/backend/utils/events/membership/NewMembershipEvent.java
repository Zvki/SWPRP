package com.polsl.backend.utils.events.membership;

import com.polsl.backend.models.ProjectMembership;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class NewMembershipEvent extends ApplicationEvent {
    private final ProjectMembership membership;

    public NewMembershipEvent(Object source, ProjectMembership membership) {
        super(source);
        this.membership = membership;
    }
}
