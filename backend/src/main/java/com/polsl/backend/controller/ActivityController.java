package com.polsl.backend.controller;

import com.polsl.backend.dto.activity.*;
import com.polsl.backend.models.User;
import com.polsl.backend.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/activity")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping("/comment")
    public ResponseEntity<ActivityResponse> addComment(@RequestBody CommentRequest data, @AuthenticationPrincipal User user) {
        var result = activityService.addComment(data, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/file")
    public ResponseEntity<ActivityResponse> addFile(@ModelAttribute FileRequest data, @AuthenticationPrincipal User user) {
        var result = activityService.addFile(data, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/meeting")
    public ResponseEntity<ActivityResponse> addMeeting(@RequestBody MeetingRequest data, @AuthenticationPrincipal User user) {
        var result = activityService.addMeeting(data, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ActivityListResponse> getProjectActivities(@PathVariable UUID projectId) {
        var result = activityService.getAllByProjectId(projectId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/{projectId}/files")
    public ResponseEntity<ActivityListResponse> getProjectFiles(@PathVariable UUID projectId) {
        var result = activityService.getAllProjectFiles(projectId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/{projectId}/meetings")
    public ResponseEntity<ActivityListResponse> getProjectMeetings(@PathVariable UUID projectId) {
        var result = activityService.getAllProjectMeetings(projectId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}