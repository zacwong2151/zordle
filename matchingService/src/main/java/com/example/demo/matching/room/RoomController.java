package com.example.demo.matching.room;

import com.example.demo.exception.ApiRequestException;
import com.example.demo.response.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping(path = "matching/room")
@Validated /*
    Spring Boot only applies method parameter validation (@RequestParam, @PathVariable, etc.) if @Validated is present at the class or method level.
    Without it, Spring will not trigger MethodArgumentNotValidException, and validation will be silently ignored.
*/
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping(path = "{roomId}")
    public ResponseEntity<ApiResponse<Room>> getRoom(@PathVariable("roomId") String roomId) {
        try {
            Room room = roomService.getRoom(roomId);
            return new ResponseEntity<>(new ApiResponse<>(
                    room,
                    String.format("Successfully retrieve room: %s", roomId),
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
    public ResponseEntity<ApiResponse<Room>> createRoom(@Valid @RequestBody Room room) {
        try {
            roomService.createRoom(room);
            return new ResponseEntity<>(new ApiResponse<>(
                    String.format("Successfully created room: %s", room.getRoomId()),
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
    public ResponseEntity<ApiResponse<Room>> deleteRoom(@PathVariable("roomId") String roomId) {
        try {
            roomService.deleteRoom(roomId);
            return new ResponseEntity<>(new ApiResponse<>(
                    String.format("Successfully delete room: %s", roomId),
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
    public ResponseEntity<ApiResponse<Room>> updateRoom(
            @PathVariable("roomId") String roomId,
            @RequestParam @NotBlank(message = "field cannot be null or blank") String user2Email
    ) {
        try {
            roomService.updateRoom(roomId, user2Email);
            return new ResponseEntity<>(new ApiResponse<>(
                    String.format("Successfully update room: %s", roomId),
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
