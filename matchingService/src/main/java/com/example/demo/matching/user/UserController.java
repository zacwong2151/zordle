package com.example.demo.matching.user;

import com.example.demo.exception.ApiRequestException;
import com.example.demo.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
    user:
         - userEmail (primary key)
         - roomId
*/

@RestController
@RequestMapping(path = "matching/user")
public class UserController {
    final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "{email}")
    public ResponseEntity<ApiResponse<User>> getUser(@PathVariable(name = "email", required = true) String email) {
        try {
            User user = userService.getUser(email);
            return new ResponseEntity<>(new ApiResponse<>(
                    user,
                    String.format("Successfully created user: %s", email),
                    true
            ), HttpStatus.CREATED);

        } catch (ApiRequestException e) {
            return new ResponseEntity<>(new ApiResponse<>(
                    null,
                    e.getMessage(),
                    false
            ), e.getHttpStatus());
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<User>> createUser(@Valid @RequestBody User user) {
        try {
            userService.createUser(user);
            return new ResponseEntity<>(new ApiResponse<>(
                    String.format("Successfully create user: %s", user.getEmail()),
                    true
            ), HttpStatus.CREATED);

        } catch (ApiRequestException e) {
            return new ResponseEntity<>(new ApiResponse<>(
                    e.getMessage(),
                    false
            ), e.getHttpStatus());
        }
    }

    @DeleteMapping(path = "{email}")
    public ResponseEntity<ApiResponse<User>> deleteUser(@PathVariable("email") String email) {
        try {
            userService.deleteUser(email);
            return new ResponseEntity<>(new ApiResponse<>(
                    String.format("Successfully delete user: %s", email),
                    true
            ), HttpStatus.OK);

        } catch (ApiRequestException e) {
            return new ResponseEntity<>(new ApiResponse<>(
                    e.getMessage(),
                    false
            ), e.getHttpStatus());
        }
    }
}
