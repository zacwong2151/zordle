package com.example.demo.findingGame.roomPOV;

import com.example.demo.exception.ApiRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
        return findingGameRoomRepo.findById(roomId).orElseThrow(() ->
                new ApiRequestException(String.format("No room of id: %s", roomId), HttpStatus.NOT_FOUND)
        );
    }

    public void createRoom(FindingGameRoom room) {
        String roomId = room.getRoomId();
        String user1Email = room.getUser1Email();
        String user2Email = room.getUser2Email();

        Optional<FindingGameRoom> r = findingGameRoomRepo.findById(roomId);
        if (r.isPresent()) {
            throw new ApiRequestException(String.format("Cannot create, room: %s already exists", roomId), HttpStatus.CONFLICT);
        }

        FindingGameRoom entry = new FindingGameRoom(
                roomId,
                user1Email,
                user2Email // should be initialised as null in frontend
        );
        findingGameRoomRepo.save(entry);
    }

    public void deleteRoom(String roomId) {
        Optional<FindingGameRoom> r = findingGameRoomRepo.findById(roomId);
        if (r.isEmpty()) {
            throw new ApiRequestException(String.format("Cannot delete, room: %s does not exist", roomId), HttpStatus.NOT_FOUND);
        }

        findingGameRoomRepo.deleteById(roomId);
    }

    @Transactional
    public void updateRoom(String roomId, String user2Email) {
        Optional<FindingGameRoom> r = findingGameRoomRepo.findById(roomId);
        if (r.isEmpty()) {
            throw new ApiRequestException(String.format("Cannot update, room: %s does not exist", roomId), HttpStatus.NOT_FOUND);
        }

        FindingGameRoom room = r.get();
        room.setUser2Email(user2Email);

        findingGameRoomRepo.save(room);
    }
}
