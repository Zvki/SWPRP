package com.polsl.backend.service;

import com.polsl.backend.dto.project.MembershipRequest;
import com.polsl.backend.dto.project.MembershipResponse;
import com.polsl.backend.dto.project.ProjectRequest;
import com.polsl.backend.dto.project.ProjectResponse;
import com.polsl.backend.enums.MembershipStatus;
import com.polsl.backend.enums.ProjectStatus;
import com.polsl.backend.models.Project;
import com.polsl.backend.models.ProjectMembership;
import com.polsl.backend.models.User;
import com.polsl.backend.repository.ProjectMembershipRepository;
import com.polsl.backend.repository.ProjectRepository;
import com.polsl.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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
    private final ProjectMembershipRepository projectMembershipRepository;

    public ProjectResponse getProjectById(UUID id){
        return ProjectResponse.fromProject(projectRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Project with id " + id + " wasn't found")));
    }

    public List<ProjectResponse> getUserProjects(User user){

        List<Project> projects = List.of();

        if (user.getRole().equals(SUPERVISOR)) {
            projects = projectRepository.findAllBySupervisorId(user.getId());
        } else if (user.getRole().equals(STUDENT)) {
            projects = projectRepository.findProjectsByStudentId(user.getId());
        }

        return projects.stream().map(ProjectResponse::fromProject).toList();
    }

    public ProjectResponse create(User user, ProjectRequest projectData){

        var project = Project.builder()
                .title(projectData.title())
                .description(projectData.description())
                .build();

        if(user.getRole() == SUPERVISOR){
            project.setSupervisor(user);
            project.setStatus(ACTIVE);
        } else {

            var supervisor = userRepository.findById(projectData.supervisorId())
                    .orElseThrow(()-> new EntityNotFoundException("Supervisor with id " + projectData.supervisorId() + " wasn't found"));

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

    public void changeStatus(UUID projectId){
        var project = projectRepository.findById(projectId)
                .orElseThrow(()-> new EntityNotFoundException("Project with id " + projectId + " wasn't found"));
        project.setStatus(ACTIVE);
        projectRepository.save(project);
    }

    @Transactional
    public MembershipResponse createMembership(MembershipRequest data) {
            var project = projectRepository.findById(data.projectId())
                    .orElseThrow(() -> new EntityNotFoundException("Project with id " + data.projectId() + " wasn't found"));

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

            var result = projectMembershipRepository.save(membership);

            return MembershipResponse.fromMembership(result);
    }

}