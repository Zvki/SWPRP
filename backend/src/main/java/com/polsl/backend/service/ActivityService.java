package com.polsl.backend.service;

import com.polsl.backend.dto.activity.CommentRequest;
import com.polsl.backend.models.Project;
import com.polsl.backend.models.User;
import com.polsl.backend.models.activities.Activity;
import com.polsl.backend.models.activities.ActivityReference;
import com.polsl.backend.models.activities.Comment;
import com.polsl.backend.repository.ActivityReferenceRepository;
import com.polsl.backend.repository.ActivityRepository;
import com.polsl.backend.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
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

    public Activity addComment(CommentRequest data, User author) {

        var parent = data.parentId() == null ? null : activityReferenceRepository.findById(data.parentId())
                .orElseThrow( () -> new EntityNotFoundException( "Comment with id " + data.parentId() + " wasn't found"));

        var project = projectRepository.findById(data.projectId())
                .orElseThrow( () -> new EntityNotFoundException( "Project with id " + data.projectId() + " wasn't found"));

        var comment = Comment.builder()
                .content(data.content())
                .parentReference(parent)
                .build();

        log.info("user: {}", author.toString());

        comment.setAuthor(author);

        var activity = Activity.builder()
                .project(project)
                .reference(comment)
                .build();

        return activityRepository.save(activity);
    }


}
