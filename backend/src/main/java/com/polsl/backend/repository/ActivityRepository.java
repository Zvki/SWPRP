package com.polsl.backend.repository;

import com.polsl.backend.dto.activity.ActivityResponse;
import com.polsl.backend.enums.ActivityType;
import com.polsl.backend.enums.FileStatus;
import com.polsl.backend.models.activities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("""
            SELECT a FROM Activity a
            JOIN File f ON a.reference = f
            WHERE a.project.supervisor.id = :projectSupervisorId
            AND f.type = :type
            AND f.status = :status
            """)
    List<Activity> findActivitiesByProjectSupervisorIdAndReferenceTypeAndFileStatus(
            @Param("projectSupervisorId") UUID projectSupervisorId,
            @Param("type") ActivityType type,
            @Param("status") FileStatus status);
}
