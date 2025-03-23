package com.example.demo.findingGame.userPOV;

import com.example.demo.exception.ApiRequestException;
import com.example.demo.findingGame.roomPOV.FindingGameRoom;
import com.example.demo.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
    finding_game_user:
         - userEmail (primary key)
         - roomId
*/

@RestController
@RequestMapping(path = "finding-game/user")
public class FindingGameUserController {
    final FindingGameUserService findingGameUserService;

    public FindingGameUserController(FindingGameUserService findingGameUserService) {
        this.findingGameUserService = findingGameUserService;
    }

    @GetMapping(path = "{email}")
    public ResponseEntity<ApiResponse<FindingGameUser>> getUser(@PathVariable(name = "email", required = true) String email) {
        try {
            FindingGameUser user = findingGameUserService.getUser(email);
            return new ResponseEntity<>(new ApiResponse<>(
                    user,
                    String.format("Successfully created finding_game_user: %s", email),
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
    public ResponseEntity<ApiResponse<FindingGameUser>> createUser(@Valid @RequestBody FindingGameUser user) {
        try {
            findingGameUserService.createUser(user);
            return new ResponseEntity<>(new ApiResponse<>(
                    String.format("Successfully create finding_game_user: %s", user.getEmail()),
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
    public ResponseEntity<ApiResponse<FindingGameUser>> deleteUser(@PathVariable("email") String email) {
        try {
            findingGameUserService.deleteUser(email);
            return new ResponseEntity<>(new ApiResponse<>(
                    String.format("Successfully delete finding_game_user: %s", email),
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
