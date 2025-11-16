package com.polsl.backend.service;

import com.polsl.backend.dto.project.ProjectCreation;
import com.polsl.backend.dto.project.ProjectResponse;
import com.polsl.backend.enums.MembershipStatus;
import com.polsl.backend.models.Project;
import com.polsl.backend.models.ProjectMembership;
import com.polsl.backend.models.User;
import com.polsl.backend.repository.ProjectRepository;
import com.polsl.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.polsl.backend.enums.ProjectStatus.ACTIVE;
import static com.polsl.backend.enums.ProjectStatus.PENDING;
import static com.polsl.backend.enums.UserRole.STUDENT;
import static com.polsl.backend.enums.UserRole.SUPERVISOR;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public List<ProjectResponse> getUserProjects(User user){

        List<Project> projects = List.of();

        if (user.getRole().equals(SUPERVISOR)) {
            projects = projectRepository.findAllBySupervisorId(user.getId());
        } else if (user.getRole().equals(STUDENT)) {
            projects = projectRepository.findProjectsByStudentId(user.getId());
        }

        return projects.stream().map(ProjectResponse::fromProject).toList();
    }

    public ProjectResponse create(User user, ProjectCreation projectData){

        var project = Project.builder()
                .title(projectData.title())
                .description(projectData.description())
                .build();

        if(user.getRole() == SUPERVISOR){
            var invites = createMemberships(projectData.emailInvites(), project);

            project.setSupervisor(user);
            project.setStatus(ACTIVE);
            project.getMembers().addAll(invites);
        } else {

            var supervisor = userRepository.findById(projectData.supervisor().id())
                    .orElseThrow(()-> new EntityNotFoundException("Supervisor with id " + projectData.supervisor().id() + " wasn't found"));

            var membership = ProjectMembership.builder()
                    .project(project)
                    .student(user)
                    .studentEmail(user.getEmail())
                    .status(MembershipStatus.ACCEPTED)
                    .build();

            var invites = createMemberships(projectData.emailInvites(), project);

            project.setSupervisor(supervisor);
            project.setStatus(PENDING);
            project.getMembers().add(membership);
            project.getMembers().addAll(invites);
        }

        var result = projectRepository.save(project);

        return ProjectResponse.fromProject(result);
    }

    private List<ProjectMembership> createMemberships(List<String> emails, Project project) {

        if(emails == null){
            return new ArrayList<>();
        }

        List<ProjectMembership> memberships = new ArrayList<>();

        for(var email : emails){
            var result = ProjectMembership.builder()
                    .studentEmail(email)
                    .status(MembershipStatus.PENDING)
                    .project(project)
                    .invitationToken(UUID.randomUUID())
                    .build();
            memberships.add(result);
        }

        return memberships;
    }

}
