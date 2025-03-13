package com.example.demo.findingGame.userPOV;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

/*
    finding_game_user:
         - userEmail (primary key)
         - roomId
*/

@RestController
@RequestMapping(path = "battle/finding-game/user")
public class FindingGameUserController {
    final FindingGameUserService findingGameUserService;

    public FindingGameUserController(FindingGameUserService findingGameUserService) {
        this.findingGameUserService = findingGameUserService;
    }

    @GetMapping(path = "{email}")
    public FindingGameUser getUser(@PathVariable("email") String email) {
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
