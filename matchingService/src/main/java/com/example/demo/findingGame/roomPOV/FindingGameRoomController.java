package com.example.demo.findingGame.roomPOV;

import com.example.demo.exception.ApiRequestException;
import com.example.demo.response.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiResponse<FindingGameRoom>> getRoom(@PathVariable("roomId") String roomId) {
        try {
            FindingGameRoom room = findingGameRoomService.getRoom(roomId);
            return new ResponseEntity<>(new ApiResponse<>(
                    room,
                    String.format("Successfully retrieve finding_game_room: %s", roomId),
                    true
            ), HttpStatus.OK);

        } catch (ApiRequestException e) {
            return new ResponseEntity<>(new ApiResponse<>(
                    null,
                    e.getMessage(),
                    false
            ), e.getHttpStatus());
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<FindingGameRoom>> createRoom(@Valid @RequestBody FindingGameRoom room) {
        try {
            findingGameRoomService.createRoom(room);
            return new ResponseEntity<>(new ApiResponse<>(
                    String.format("Successfully created finding_game_room: %s", room.getRoomId()),
                    true
            ), HttpStatus.CREATED);

        } catch (ApiRequestException e) {
            return new ResponseEntity<>(new ApiResponse<>(
                    e.getMessage(),
                    false
            ), e.getHttpStatus());
        }
    }

    @DeleteMapping(path = "{roomId}")
    public ResponseEntity<ApiResponse<FindingGameRoom>> deleteRoom(@PathVariable("roomId") String roomId) {
        try {
            findingGameRoomService.deleteRoom(roomId);
            return new ResponseEntity<>(new ApiResponse<>(
                    String.format("Successfully delete finding_game_room: %s", roomId),
                    true
            ), HttpStatus.OK);

        } catch (ApiRequestException e) {
            return new ResponseEntity<>(new ApiResponse<>(
                    e.getMessage(),
                    false
            ), e.getHttpStatus());
        }
    }

    @PutMapping(path = "{roomId}")
    public ResponseEntity<ApiResponse<FindingGameRoom>> updateRoom(
            @PathVariable("roomId") String roomId,
            @RequestParam @NotBlank(message = "field cannot be null or blank") String user2Email
    ) {
        try {
            findingGameRoomService.updateRoom(roomId, user2Email);
            return new ResponseEntity<>(new ApiResponse<>(
                    String.format("Successfully update finding_game_room: %s", roomId),
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
