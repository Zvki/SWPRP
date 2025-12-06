package com.polsl.backend.repository;

import com.polsl.backend.dto.activity.ActivityResponse;
import com.polsl.backend.enums.ActivityType;
import com.polsl.backend.enums.FileStatus;
import com.polsl.backend.models.activities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ActivityRepository extends JpaRepository<Activity, UUID> {

    @Query("""
    SELECT DISTINCT a FROM Activity a
    JOIN FETCH a.reference r
    JOIN FETCH r.author
    WHERE a.project.id = :projectId
    ORDER BY a.createdAt DESC
    """)
    List<Activity> findAllByProjectId(UUID projectId);

    List<Activity> findAllByProject_IdAndReference_Type(UUID projectId, ActivityType type);

    List<Activity> findAllByProject_Supervisor_IdAndReference_TypeAndReference_Status(UUID projectSupervisorId, ActivityType type, FileStatus status);
}
