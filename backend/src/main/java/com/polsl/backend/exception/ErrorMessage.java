package com.polsl.backend.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Builder
@Data
public class ErrorMessage {

    private LocalDateTime timestamp;
    private String message;
    private Integer statusCode;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<String> errors;
}
