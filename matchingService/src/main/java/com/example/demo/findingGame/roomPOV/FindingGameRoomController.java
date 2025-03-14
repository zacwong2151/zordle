package com.example.demo.findingGame.roomPOV;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "finding-game/room")
@Validated /*
    Spring Boot only applies method parameter validation (@RequestParam, @PathVariable, etc.) if @Validated is present at the class or method level.
    Without it, Spring will not trigger MethodArgumentNotValidException, and validation will be silently ignored.
*/
public class FindingGameRoomController {

    private final FindingGameRoomService findingGameRoomService;

    public FindingGameRoomController(FindingGameRoomService findingGameRoomService) {
        this.findingGameRoomService = findingGameRoomService;
    }

    @GetMapping(path = "{roomId}")
    public FindingGameRoom getRoom(@PathVariable("roomId") String roomId) {
        return findingGameRoomService.getRoom(roomId);
    }

    @PostMapping
    public void createRoom(@Valid @RequestBody FindingGameRoom room) {
        findingGameRoomService.createRoom(room);
    }

    @DeleteMapping(path = "{roomId}")
    public void deleteRoom(@PathVariable("roomId") String roomId) {
        findingGameRoomService.deleteRoom(roomId);
    }

    @PutMapping(path = "{roomId}")
    public void updateRoom(
            @PathVariable("roomId") String roomId,
            @RequestParam @NotBlank(message = "field cannot be null or blank") String user2Email
    ) {
        findingGameRoomService.updateRoom(roomId, user2Email);
    }
}
