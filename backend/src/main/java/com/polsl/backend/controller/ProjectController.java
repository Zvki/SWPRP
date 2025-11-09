package com.polsl.backend.controller;

import com.polsl.backend.dto.project.ProjectCreation;
import com.polsl.backend.dto.project.ProjectResponse;
import com.polsl.backend.models.Project;
import com.polsl.backend.models.User;
import com.polsl.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@AuthenticationPrincipal User user,
                                                         @RequestBody ProjectCreation projectData) {
        final var result = projectService.create(user, projectData);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
