package com.polsl.backend.repository;

import com.polsl.backend.enums.UserRole;
import com.polsl.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    List<User> findAllByRole(UserRole role);
}
