package com.polsl.backend.controller;

import com.polsl.backend.dto.project.MembershipRequest;
import com.polsl.backend.dto.project.MembershipResponse;
import com.polsl.backend.dto.project.ProjectRequest;
import com.polsl.backend.dto.project.ProjectResponse;
import com.polsl.backend.models.User;
import com.polsl.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@AuthenticationPrincipal User user,
                                                         @RequestBody ProjectRequest projectData) {
        final var result = projectService.create(user, projectData);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getUserProjects(@AuthenticationPrincipal User user) {
        final var result = projectService.getUserProjects(user);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable UUID id){
        final var result = projectService.getProjectById(id);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> changeProjectStatus(@PathVariable UUID id){
        projectService.changeStatus(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("/add-member")
    public ResponseEntity<MembershipResponse> addMember(@RequestBody MembershipRequest data){
        final var result = projectService.createMembership(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}