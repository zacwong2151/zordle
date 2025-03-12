package com.example.demo.findingGame.roomPOV;

import com.example.demo.exception.ApiRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/*
    finding_game_room:
         - roomId (primary key)
         - user1Email
         - user2Email (initialised to null)
*/

@Service
public class FindingGameRoomService {
    final FindingGameRoomRepo findingGameRoomRepo;

    public FindingGameRoomService(FindingGameRoomRepo findingGameRoomRepo) {
        this.findingGameRoomRepo = findingGameRoomRepo;
    }

    public FindingGameRoom getRoom(String roomId) {
        return findingGameRoomRepo.findById(roomId).orElse(null);
    }

    public void createRoom(FindingGameRoom room) {
        String roomId = room.getRoomId();
        String user1Email = room.getUser1Email();

        if (getRoom(roomId) != null) {
            throw new ApiRequestException(String.format("Cannot create, room: %s already exists", roomId), HttpStatus.CONFLICT);
        }

        FindingGameRoom entry = new FindingGameRoom(
                roomId,
                user1Email,
                null // should already be initialised as null in frontend
        );
        findingGameRoomRepo.save(entry);
    }

    public void deleteRoom(String roomId) {
        if (getRoom(roomId) == null) {
            throw new ApiRequestException(String.format("Cannot delete, roomId: %s does not exist", roomId), HttpStatus.NOT_FOUND);
        }

        findingGameRoomRepo.deleteById(roomId);
    }

    @Transactional
    public void updateRoom(String roomId, String user2Email) {
        if (user2Email == null || user2Email.isBlank()) {
            throw new ApiRequestException("Cannot update, user2Email cannot be null or empty", HttpStatus.BAD_REQUEST);
        }

        FindingGameRoom room = getRoom(roomId);

        if (room == null) {
            throw new ApiRequestException(String.format("Cannot update, roomId: %s does not exist", roomId), HttpStatus.NOT_FOUND);
        }

        room.setUser2Email(user2Email);
        findingGameRoomRepo.save(room);
    }
}
