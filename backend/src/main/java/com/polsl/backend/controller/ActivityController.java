package com.polsl.backend.controller;

import com.polsl.backend.dto.activity.*;
import com.polsl.backend.dto.activity.comment.CommentRequest;
import com.polsl.backend.dto.activity.file.FileRequest;
import com.polsl.backend.dto.activity.file.FileStatusRequest;
import com.polsl.backend.dto.activity.meeting.MeetingNoteRequest;
import com.polsl.backend.dto.activity.meeting.MeetingRequest;
import com.polsl.backend.enums.FileStatus;
import com.polsl.backend.service.ActivityService;
import com.polsl.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/activity")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;
    private final AuthService authService;

    @PreAuthorize("@projectSecurity.isMember(#data.projectId(), authentication)")
    @PostMapping("/comment")
    public ResponseEntity<ActivityResponse> addComment(@RequestBody CommentRequest data, @AuthenticationPrincipal Jwt jwt) {
        final var user = authService.getUser(jwt);
        var result = activityService.addComment(data, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PreAuthorize("@projectSecurity.isMember(#data.projectId(), authentication)")
    @PostMapping("/file")
    public ResponseEntity<ActivityResponse> addFile(@ModelAttribute FileRequest data, @AuthenticationPrincipal Jwt jwt) {
        final var user = authService.getUser(jwt);
        var result = activityService.addFile(data, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PreAuthorize("@projectSecurity.isMember(#data.projectId(), authentication)")
    @PostMapping("/meeting")
    public ResponseEntity<ActivityResponse> addMeeting(@RequestBody MeetingRequest data, @AuthenticationPrincipal Jwt jwt) {
        final var user = authService.getUser(jwt);
        var result = activityService.addMeeting(data, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PreAuthorize("@projectSecurity.isMember(#projectId, authentication)")
    @GetMapping("/{projectId}")
    public ResponseEntity<ActivityListResponse> getProjectActivities(@PathVariable UUID projectId) {
        var result = activityService.getAllByProjectId(projectId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PreAuthorize("@projectSecurity.isMember(#projectId, authentication)")
    @GetMapping("/{projectId}/files")
    public ResponseEntity<ActivityListResponse> getProjectFiles(@PathVariable UUID projectId) {
        var result = activityService.getAllProjectFiles(projectId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PreAuthorize("@projectSecurity.isMember(#projectId, authentication)")
    @GetMapping("/{projectId}/meetings")
    public ResponseEntity<ActivityListResponse> getProjectMeetings(@PathVariable UUID projectId) {
        var result = activityService.getAllProjectMeetings(projectId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/files/{status}")
    public ResponseEntity<ActivityListResponse> getAllPendingFiles(@AuthenticationPrincipal Jwt jwt, @PathVariable FileStatus status) {
        final var user = authService.getUser(jwt);
        final var result = activityService.getFilesByStatus(user, status);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/next-meetings")
    public ResponseEntity<ActivityListResponse> getNextMeetings(@AuthenticationPrincipal Jwt jwt) {
        final var user = authService.getUser(jwt);
        final var result = activityService.getNextMeetings(user);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PatchMapping("/file-status")
    public ResponseEntity<Void> updateFileStatus(@RequestBody FileStatusRequest data) {
        activityService.updateFileStatus(data);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PatchMapping("/meeting-note")
    public ResponseEntity<Void> addMeetingNote(@RequestBody MeetingNoteRequest data) {
        activityService.addMeetingNote(data);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @DeleteMapping("/{activityId}")
    public ResponseEntity<Void> deleteActivity(@PathVariable UUID activityId) {
        activityService.deleteActivity(activityId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}