package com.example.demo.findingGame.roomPOV;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "battle/finding-game/room")
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
    public void createRoom(@RequestBody FindingGameRoom room) {
        findingGameRoomService.createRoom(room);
    }

    @DeleteMapping(path = "{roomId}")
    public void deleteRoom(@PathVariable("roomId") String roomId) {
        findingGameRoomService.deleteRoom(roomId);
    }

    @PutMapping(path = "{roomId}")
    public void updateRoom(
            @PathVariable("roomId") String roomId,
            @RequestParam String user2Email
    ) {
        findingGameRoomService.updateRoom(roomId, user2Email);
    }
}
