package com.polsl.backend.repository;

import com.polsl.backend.models.ProjectMembership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProjectMembershipRepository extends JpaRepository<ProjectMembership, UUID> {
}
