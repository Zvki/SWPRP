package com.polsl.backend.exception;

import jakarta.persistence.EntityExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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

    private ErrorMessage createErrorMessage(String message, Integer statusCode, List<String> errors){
        return ErrorMessage.builder().timestamp(LocalDateTime.now()).message(message).statusCode(statusCode).errors(errors).build();
    }

}
