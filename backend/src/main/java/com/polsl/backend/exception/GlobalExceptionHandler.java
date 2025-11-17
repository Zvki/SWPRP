package com.polsl.backend.exception;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.List;

import static java.util.Collections.singletonList;
import static org.springframework.http.HttpStatus.CONFLICT;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityExistsException.class)
    public ResponseEntity<ErrorMessage> entityExistsExceptionHandler(EntityExistsException ex){
        log.warn("Entity already exists: {}", ex.getMessage());
        return ResponseEntity.status(CONFLICT).body(createErrorMessage(ex.getMessage(), CONFLICT.value(), singletonList(ex.getMessage())));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorMessage> entityNotFoundExceptionHandler(EntityNotFoundException ex){
        log.warn("Entity not found: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(createErrorMessage(ex.getMessage(), HttpStatus.NOT_FOUND.value(), singletonList(ex.getMessage())));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorMessage> badCredentialsExceptionHandler(BadCredentialsException ex){
        log.warn("Bad credentials: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(createErrorMessage(ex.getMessage(), HttpStatus.UNAUTHORIZED.value(), singletonList(ex.getMessage())));
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<ErrorMessage> authorizationDeniedExceptionHandler(AuthorizationDeniedException ex){
        log.warn("Authorization denied: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(createErrorMessage(ex.getMessage(), HttpStatus.FORBIDDEN.value(), singletonList(ex.getMessage())));
    }

    private ErrorMessage createErrorMessage(String message, Integer statusCode, List<String> errors){
        return ErrorMessage.builder().timestamp(LocalDateTime.now()).message(message).statusCode(statusCode).errors(errors).build();
    }

}
