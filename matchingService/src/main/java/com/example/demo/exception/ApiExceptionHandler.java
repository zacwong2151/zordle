package com.example.demo.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e) {
        HttpStatus httpStatus = e.getHttpStatus();
        ApiException exception = new ApiException(
                e.getMessage(),
                httpStatus
        );
        return new ResponseEntity<>(exception, httpStatus);
    }

    /**
     * Handles exceptions thrown when controller validates method parameters.
     */
    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        String errorMessage = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                .findFirst()
                .orElse("Invalid request");

        ApiException exception = new ApiException(
                errorMessage,
                httpStatus
        );
        return new ResponseEntity<>(exception, httpStatus);
    }

    /**
     * Handles exceptions thrown when system tries to enter invalid data into database.
     */
    @ExceptionHandler(value = {ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException e) {
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        ApiException exception = new ApiException(
                e.getMessage(),
                httpStatus
        );
        return new ResponseEntity<>(exception, httpStatus);
    }
}
