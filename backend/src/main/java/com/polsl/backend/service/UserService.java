package com.polsl.backend.service;

import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.enums.MembershipStatus;
import com.polsl.backend.enums.UserRole;
import com.polsl.backend.repository.ProjectMembershipRepository;
import com.polsl.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ProjectMembershipRepository projectMembershipRepository;

    public List<UserResponse> getSupervisors() {
        var supervisors = userRepository.findAllByRole(UserRole.SUPERVISOR);

        return supervisors.stream().map(UserResponse::fromUser).toList();
    }

    public void activateMembership(UUID token) {
        var membership = projectMembershipRepository.findByInvitationToken(token)
                .orElseThrow(() -> new EntityNotFoundException("Membership invitation with token " + token + " wasn't found"));
        membership.setStatus(MembershipStatus.ACCEPTED);
        projectMembershipRepository.save(membership);
    }
}
