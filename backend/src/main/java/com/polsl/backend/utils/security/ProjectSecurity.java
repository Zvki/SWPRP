package com.polsl.backend.utils.security;

import com.polsl.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.UUID;

@EnableMethodSecurity
@Component
@RequiredArgsConstructor
public class ProjectSecurity {

    private final ProjectRepository projectRepository;

    public boolean isMember(UUID projectId, Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getClaim("email");

        return projectRepository.findById(projectId)
                .map(p -> p.getMembers()
                        .stream()
                        .anyMatch(m -> m.getStudent()
                                .getEmail()
                                .equalsIgnoreCase(email))
                        || p.getSupervisor()
                        .getEmail()
                        .equalsIgnoreCase(email)
                )
                .orElse(false);
    }
}
