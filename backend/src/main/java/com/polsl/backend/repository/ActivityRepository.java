package com.polsl.backend.repository;

import com.polsl.backend.enums.ActivityType;
import com.polsl.backend.enums.FileStatus;
import com.polsl.backend.models.User;
import com.polsl.backend.models.activities.Activity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
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
                JOIN File f ON f = a.reference
                WHERE a.project.supervisor = :user
                  AND f.type = :type
                  AND f.status = :status
            """)
    List<Activity> findFileActivitiesBySupervisor(
            @Param("user") User user,
            @Param("type") ActivityType type,
            @Param("status") FileStatus status);

    @Query("""
             SELECT a FROM Activity a
             JOIN File f ON f = a.reference
             JOIN a.project.members pm
             WHERE pm.student = :user
             AND f.type = :type
             AND f.status = :status
            """)
    List<Activity> findFileActivitiesByMembers(
            @Param("user") User user,
            @Param("type") ActivityType type,
            @Param("status") FileStatus status);

    @Query("""
                SELECT a FROM Activity a
                JOIN Meeting m ON m = a.reference
                WHERE a.project.supervisor = :user
                  AND m.startTime >= :now
                ORDER BY m.startTime ASC
            """)
    List<Activity> findMeetingActivitiesBySupervisor(
            @Param("user") User user,
            @Param("now") LocalDateTime now,
            Pageable pageable);

    @Query("""
                SELECT a FROM Activity a
                JOIN Meeting m ON m = a.reference
                JOIN a.project.members pm
                WHERE pm.student = :user
                  AND m.startTime >= :now
                ORDER BY m.startTime ASC
            """)
    List<Activity> findMeetingsForMember(
            @Param("user") User user,
            @Param("now") LocalDateTime now,
            Pageable pageable
    );


}
