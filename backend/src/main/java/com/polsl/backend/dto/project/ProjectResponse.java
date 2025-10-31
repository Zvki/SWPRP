package com.polsl.backend.dto.project;

import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.models.Project;
import com.polsl.backend.models.ProjectMembership;

import java.util.List;
import java.util.UUID;

public record ProjectResponse(
    UUID id,
    String title,
    String description,
    List<MembershipResponse> members,
    UserResponse supervisor
) {
    public static ProjectResponse fromProject(Project project) {
        if (project == null) {
            return null;
        }

        UserResponse supervisorDto = (project.getSupervisor() != null)
                ? UserResponse.fromUser(project.getSupervisor())
                : null;

        List<MembershipResponse> memberDtos = project.getMembers()
                .stream()
                .map(MembershipResponse::fromMembership)
                .toList();

        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                memberDtos,
                supervisorDto
        );
    }
}
