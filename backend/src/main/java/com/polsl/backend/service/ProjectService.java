package com.polsl.backend.service;

import com.polsl.backend.dto.activity.StatusRequest;
import com.polsl.backend.dto.project.*;
import com.polsl.backend.enums.MembershipStatus;
import com.polsl.backend.models.Project;
import com.polsl.backend.models.ProjectMembership;
import com.polsl.backend.models.User;
import com.polsl.backend.repository.ProjectRepository;
import com.polsl.backend.repository.UserRepository;
import com.polsl.backend.utils.events.membership.NewMembershipEvent;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
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
    private final ApplicationEventPublisher eventPublisher;

    public ProjectResponse getProjectById(UUID id) {
        var project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project with id " + id + " wasn't found"));

        return ProjectResponse.fromProject(project);
    }

    public List<ProjectResponse> getUserProjects(User user) {

        List<Project> projects = List.of();

        if (user.getRole().equals(SUPERVISOR)) {
            projects = projectRepository.findAllBySupervisorId(user.getId());
        } else if (user.getRole().equals(STUDENT)) {
            projects = projectRepository.findProjectsByStudentId(user.getId());
        }

        return projects.stream().map(ProjectResponse::fromProject).toList();
    }

    public ProjectResponse create(User user, ProjectRequest projectData) {

        var project = Project.builder()
                .title(projectData.title())
                .description(projectData.description())
                .build();

        if (user.getRole() == SUPERVISOR) {
            project.setSupervisor(user);
            project.setStatus(ACTIVE);
        } else {

            var supervisor = userRepository.findById(projectData.supervisorId())
                    .orElseThrow(() -> new EntityNotFoundException("Supervisor with id " + projectData.supervisorId() + " wasn't found"));

            var membership = ProjectMembership.builder()
                    .project(project)
                    .student(user)
                    .studentEmail(user.getEmail())
                    .status(MembershipStatus.ACCEPTED)
                    .build();

            project.setSupervisor(supervisor);
            project.setStatus(PENDING);
            project.getMembers().add(membership);
        }

        var result = projectRepository.save(project);

        return ProjectResponse.fromProject(result);
    }

    public void changeStatus(StatusRequest data) {
        var project = projectRepository.findById(data.id())
                .orElseThrow(() -> new EntityNotFoundException("Project with id " + data.id() + " wasn't found"));
        project.setStatus(data.status());
        projectRepository.save(project);
    }

    @Transactional
    public MembershipResponse createMembership(MembershipRequest data) {
        var project = projectRepository.findById(data.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project with id " + data.projectId() + " wasn't found"));

        if (project.getMembers()
                .stream()
                .anyMatch(m -> m.getStudent().getEmail().equalsIgnoreCase(data.email()))) {
            throw new IllegalArgumentException("User with email " + data.email() + " is a member");
        }

        if (project.getSupervisor().getEmail().equalsIgnoreCase(data.email()))
            throw new IllegalArgumentException("User with email " + data.email() + " is supervisor");

        var member = userRepository.findByEmail(data.email())
                .orElseThrow(() -> new EntityNotFoundException("User with email " + data.email() + " wasn't found"));

        var membership = ProjectMembership.builder()
                .studentEmail(member.getEmail())
                .status(MembershipStatus.PENDING)
                .student(member)
                .project(project)
                .invitationToken(UUID.randomUUID())
                .build();

        project.getMembers().add(membership);
        projectRepository.save(project);

        eventPublisher.publishEvent(new NewMembershipEvent(this, membership));

        return MembershipResponse.fromMembership(membership);
    }

    public ProjectResponse addLink(LinkRequest data) {
        var project = projectRepository.findById(data.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project with id " + data.projectId() + " wasn't found"));

        if (project.getLinks() == null) {
            project.setLinks(new ArrayList<>());
        }

        project.getLinks().add(data.url());

        return ProjectResponse.fromProject(projectRepository.save(project));
    }

}