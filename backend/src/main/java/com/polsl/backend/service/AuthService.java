package com.polsl.backend.service;

import com.polsl.backend.dto.user.UserLogin;
import com.polsl.backend.dto.user.UserRegister;
import com.polsl.backend.models.LinkedAccount;
import com.polsl.backend.models.User;
import com.polsl.backend.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.polsl.backend.enums.Provider.EMAIL;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(UserRegister userData) {

        if(userRepository.findByEmail(userData.email()).isPresent()){
            throw new EntityExistsException("User with email " + userData.email() + " already exists");
        }

        final var hashPwd = passwordEncoder.encode(userData.password());
        final var user = User.build(userData, hashPwd);
        final var account = LinkedAccount.builder()
                .user(user)
                .provider(EMAIL)
                .providerUserId(user.getEmail())
                .build();

        return userRepository.save(user);
    }

    public User login(UserLogin userData) {
        final var user = userRepository.findByEmail(userData.email())
                .orElseThrow(() -> new EntityNotFoundException("User with email " + userData.email() + " wasn't found"));

        if(!passwordEncoder.matches(userData.password(), user.getPassword())){
            throw new BadCredentialsException("Invalid password");
        }
        return user;
    }
}
