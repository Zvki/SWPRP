package com.polsl.backend.repository;

import com.polsl.backend.models.Project;
import com.polsl.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
    List<Project> findAllBySupervisorId(UUID id);

    @Query("SELECT p FROM Project p JOIN p.members m WHERE m.student.id = :studentId")
    List<Project> findProjectsByStudentId(UUID studentId);
}
