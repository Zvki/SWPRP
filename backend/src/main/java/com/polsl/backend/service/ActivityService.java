package com.polsl.backend.service;

import com.polsl.backend.dto.activity.ActivityResponse;
import com.polsl.backend.dto.activity.CommentRequest;
import com.polsl.backend.enums.ActivityType;
import com.polsl.backend.models.User;
import com.polsl.backend.models.activities.Activity;
import com.polsl.backend.models.activities.Comment;
import com.polsl.backend.repository.ActivityReferenceRepository;
import com.polsl.backend.repository.ActivityRepository;
import com.polsl.backend.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final ActivityReferenceRepository activityReferenceRepository;
    private final ProjectRepository projectRepository;

    @Transactional
    public ActivityResponse addComment(CommentRequest data, User author) {

        var parent = data.parentId() == null ? null : activityReferenceRepository.findById(data.parentId())
                .orElseThrow( () -> new EntityNotFoundException( "Comment with id " + data.parentId() + " wasn't found"));

        var project = projectRepository.findById(data.projectId())
                .orElseThrow( () -> new EntityNotFoundException( "Project with id " + data.projectId() + " wasn't found"));

        var comment = Comment.builder()
                .type(ActivityType.COMMENT)
                .author(author)
                .content(data.content())
                .parentReference(parent)
                .build();

        var activity = Activity.builder()
                .project(project)
                .reference(comment)
                .build();

        var result = activityRepository.save(activity);

        return ActivityResponse.fromActivity(result);
    }


}
