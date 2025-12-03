package com.polsl.backend.utils.events.activity;

import com.polsl.backend.models.activities.Activity;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class NewActivityEvent extends ApplicationEvent {
    private final Activity activity;

    public NewActivityEvent(Object source, Activity activity) {
        super(source);
        this.activity = activity;
    }
}
