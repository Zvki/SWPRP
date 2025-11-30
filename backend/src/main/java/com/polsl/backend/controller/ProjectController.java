package com.polsl.backend.controller;

import com.polsl.backend.dto.activity.StatusRequest;
import com.polsl.backend.dto.project.MembershipRequest;
import com.polsl.backend.dto.project.MembershipResponse;
import com.polsl.backend.dto.project.ProjectRequest;
import com.polsl.backend.dto.project.ProjectResponse;
import com.polsl.backend.service.AuthService;
import com.polsl.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@AuthenticationPrincipal Jwt jwt,
                                                         @RequestBody ProjectRequest projectData) {
        final var user = authService.getUser(jwt);
        final var result = projectService.create(user, projectData);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getUserProjects(@AuthenticationPrincipal Jwt jwt) {
        final var user = authService.getUser(jwt);
        final var result = projectService.getUserProjects(user);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable UUID id) {
        final var result = projectService.getProjectById(id);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PatchMapping("/status")
    public ResponseEntity<Void> changeProjectStatus(@RequestBody StatusRequest data) {
        projectService.changeStatus(data);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("/add-member")
    public ResponseEntity<MembershipResponse> addMember(@RequestBody MembershipRequest data) {
        final var result = projectService.createMembership(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}