package com.polsl.backend.service;

import com.polsl.backend.enums.UserRole;
import com.polsl.backend.models.User;
import com.polsl.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public User getUser(Jwt jwt) {
        String id = jwt.getSubject();

        return userRepository.findById(id).orElseGet(() -> createUser(jwt));
    }

    public User createUser(Jwt jwt) {
        String id = jwt.getSubject();
        String email = jwt.getClaim("email");
        String firstName = jwt.getClaim("given_name");
        String lastName = jwt.getClaim("family_name");

        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        List<String> roles = realmAccess != null ? (List<String>) realmAccess.get("roles") : List.of();
        UserRole role = roles.contains("SUPERVISOR")
                ? UserRole.SUPERVISOR
                : UserRole.STUDENT;

        User newUser = User.builder()
                .id(id)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .role(role)
                .build();

        return userRepository.save(newUser);
    }

}
