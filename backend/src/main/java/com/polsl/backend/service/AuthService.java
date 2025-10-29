package com.polsl.backend.service;

import com.polsl.backend.dto.UserRequest;
import com.polsl.backend.models.User;
import com.polsl.backend.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(UserRequest userData) {

        if(userRepository.findByEmail(userData.email()).isPresent()){
            throw new EntityExistsException("User with email " + userData.email() + " already exists");
        }

        final var hashPwd = passwordEncoder.encode(userData.password());
        final var user = User.build(userData, hashPwd);

        return userRepository.save(user);
    }
}
