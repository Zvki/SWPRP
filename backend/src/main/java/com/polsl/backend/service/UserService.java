package com.polsl.backend.service;

import com.polsl.backend.dto.user.UserResponse;
import com.polsl.backend.enums.UserRole;
import com.polsl.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserResponse> getSupervisors(){
        var supervisors = userRepository.findAllByRole(UserRole.SUPERVISOR);

        return supervisors.stream().map(UserResponse::fromUser).toList();
    }
}
