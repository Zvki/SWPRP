package com.polsl.backend.service;

import com.polsl.backend.dto.activity.*;
import com.polsl.backend.dto.activity.file.FileRequest;
import com.polsl.backend.dto.activity.file.FileStatusRequest;
import com.polsl.backend.enums.ActivityType;
import com.polsl.backend.enums.FileStatus;
import com.polsl.backend.enums.UserRole;
import com.polsl.backend.models.User;
import com.polsl.backend.models.activities.*;
import com.polsl.backend.repository.ActivityReferenceRepository;
import com.polsl.backend.repository.ActivityRepository;
import com.polsl.backend.repository.ProjectRepository;
import com.polsl.backend.utils.events.activity.NewActivityEvent;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final ActivityReferenceRepository activityReferenceRepository;
    private final ProjectRepository projectRepository;
    private final ApplicationEventPublisher eventPublisher;

    private final FileService fileService;

    @Transactional
    public ActivityResponse addComment(CommentRequest data, User author) {

        var parent = data.parentId() == null ? null : activityReferenceRepository.findById(data.parentId())
                .orElseThrow(() -> new EntityNotFoundException("Comment with id " + data.parentId() + " wasn't found"));

        var project = projectRepository.findById(data.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project with id " + data.projectId() + " wasn't found"));

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

        eventPublisher.publishEvent(new NewActivityEvent(this, result));

        return ActivityResponse.fromActivity(result);
    }

    @Transactional
    public ActivityResponse addFile(FileRequest data, User author) {
        var project = projectRepository.findById(data.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project with id " + data.projectId() + " wasn't found"));

        try {
            var storedFile = fileService.storeFile(data.projectId(), data.file());

            var file = File.builder()
                    .type(ActivityType.FILE)
                    .author(author)
                    .originalName(data.file().getOriginalFilename())
                    .content(data.content())
                    .url(storedFile._1())
                    .name(storedFile._2())
                    .status(author.getRole().equals(UserRole.SUPERVISOR) ? FileStatus.COMPLETED : FileStatus.PENDING)
                    .build();

            var activity = Activity.builder()
                    .project(project)
                    .reference(file)
                    .build();

            var result = activityRepository.save(activity);

            eventPublisher.publishEvent(new NewActivityEvent(this, result));

            return ActivityResponse.fromActivity(result);
        } catch (Exception e) {
            throw new RuntimeException("Error while storing file");
        }
    }

    @Transactional
    public ActivityResponse addMeeting(MeetingRequest data, User author) {
        var project = projectRepository.findById(data.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project with id " + data.projectId() + " wasn't found"));

        var meeting = Meeting.builder()
                .type(ActivityType.MEETING)
                .author(author)
                .title(data.title())
                .content(data.content())
                .startTime(data.meetingDate())
                .url(data.url())
                .build();

        var activity = Activity.builder()
                .project(project)
                .reference(meeting)
                .build();

        var result = activityRepository.save(activity);

        eventPublisher.publishEvent(new NewActivityEvent(this, result));

        return ActivityResponse.fromActivity(result);
    }

    public ActivityListResponse getAllByProjectId(UUID projectId) {
        var activities = activityRepository.findAllByProjectId(projectId);
        var result = activities.stream().map(ActivityResponse::fromActivity).toList();
        return new ActivityListResponse(result);
    }

    public ActivityListResponse getAllProjectFiles(UUID id) {
        var files = activityRepository.findAllByProject_IdAndReference_Type(id, ActivityType.FILE);
        var result = files.stream().map(ActivityResponse::fromActivity).toList();
        return new ActivityListResponse(result);
    }

    public ActivityListResponse getAllProjectMeetings(UUID id) {
        var meetings = activityRepository.findAllByProject_IdAndReference_Type(id, ActivityType.MEETING);
        var result = meetings.stream().map(ActivityResponse::fromActivity).toList();
        return new ActivityListResponse(result);
    }

    public ActivityListResponse getAllPendingFiles(UUID userId) {
        var files = activityRepository.
                findActivitiesByProjectSupervisorIdAndReferenceTypeAndFileStatus(userId, ActivityType.FILE, FileStatus.PENDING);
        var result = files.stream().map(ActivityResponse::fromActivity).toList();
        return new ActivityListResponse(result);
    }

    public ActivityListResponse getNextMeetings(UUID userId) {
        var meetings = activityRepository.findNextMeetings(userId, LocalDateTime.now(), PageRequest.of(0, 5));
        var result = meetings.stream().map(ActivityResponse::fromActivity).toList();
        return new ActivityListResponse(result);
    }

    @Transactional
    public void updateFileStatus(FileStatusRequest data) {
        var activity = activityRepository.findById(data.activityId())
                .orElseThrow(() -> new EntityNotFoundException("Activity with id " + data.activityId() + " wasn't found"));

        var reference = activity.getReference();

        reference = Hibernate.unproxy(reference, ActivityReference.class);

        if (!(reference instanceof File file)) {
            throw new IllegalArgumentException("Activity " + data.activityId() + " is not a file");
        }

        file.setStatus(data.status());
    }

}