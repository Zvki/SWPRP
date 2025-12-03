package com.polsl.backend.repository;

import com.polsl.backend.models.Project;
import com.polsl.backend.models.ProjectMembership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectMembershipRepository extends JpaRepository<ProjectMembership, UUID> {

    Optional<ProjectMembership> findByInvitationToken(UUID invitationToken);

    List<ProjectMembership> findByProject(Project project);
}
