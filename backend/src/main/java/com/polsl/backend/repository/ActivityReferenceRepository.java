package com.polsl.backend.repository;

import com.polsl.backend.models.activities.ActivityReference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ActivityReferenceRepository extends JpaRepository<ActivityReference, UUID> {

}
