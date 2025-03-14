package com.example.demo.findingGame.userPOV;

import com.example.demo.exception.ApiRequestException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
    public FindingGameUser getUser(@PathVariable(name = "email", required = true) String email) {
        if (email == null || email.isBlank()) {
            throw new ApiRequestException("User email cannot be empty", HttpStatus.BAD_REQUEST);
        }
        return findingGameUserService.getUser(email);
    }

    @PostMapping
    public void createUser(@Valid @RequestBody FindingGameUser user) {
        findingGameUserService.createUser(user);
    }

    @DeleteMapping(path = "{email}")
    public void deleteUser(@PathVariable("email") String email) {
        findingGameUserService.deleteUser(email);
    }
}
