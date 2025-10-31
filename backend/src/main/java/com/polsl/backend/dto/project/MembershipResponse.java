package com.polsl.backend.dto.project;

import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.enums.MembershipStatus;
import com.polsl.backend.models.ProjectMembership;

import java.util.UUID;

public record MembershipResponse(
    UUID id,
    UserResponse student,
    String studentEmail,
    MembershipStatus status
) {
    public static MembershipResponse fromMembership(ProjectMembership membership) {
        if (membership == null) {
            return null;
        }

        UserResponse studentDto = (membership.getStudent() != null)
                ? UserResponse.fromUser(membership.getStudent()) : null;

        return new MembershipResponse(
                membership.getId(),
                studentDto,
                membership.getStudentEmail(),
                membership.getStatus()
        );
    }
}
