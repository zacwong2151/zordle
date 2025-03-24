package com.example.demo.matching.room;

import com.example.demo.exception.ApiRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/*
    room:
         - roomId (primary key)
         - user1Email
         - user2Email (initialised to null)
*/

@Service
public class RoomService {
    final RoomRepo roomRepo;

    public RoomService(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    public Room getRoom(String roomId) {
        return roomRepo.findById(roomId).orElseThrow(() ->
                new ApiRequestException(String.format("No room of id: %s", roomId), HttpStatus.NOT_FOUND)
        );
    }

    public void createRoom(Room room) {
        String roomId = room.getRoomId();
        String user1Email = room.getUser1Email();
        String user2Email = room.getUser2Email();

        Optional<Room> r = roomRepo.findById(roomId);
        if (r.isPresent()) {
            throw new ApiRequestException(String.format("Cannot create, room: %s already exists", roomId), HttpStatus.CONFLICT);
        }

        Room entry = new Room(
                roomId,
                user1Email,
                user2Email // should be initialised as null in frontend
        );
        roomRepo.save(entry);
    }

    public void deleteRoom(String roomId) {
        Optional<Room> r = roomRepo.findById(roomId);
        if (r.isEmpty()) {
            throw new ApiRequestException(String.format("Cannot delete, room: %s does not exist", roomId), HttpStatus.NOT_FOUND);
        }

        roomRepo.deleteById(roomId);
    }

    @Transactional
    public void updateRoom(String roomId, String user2Email) {
        Optional<Room> r = roomRepo.findById(roomId);
        if (r.isEmpty()) {
            throw new ApiRequestException(String.format("Cannot update, room: %s does not exist", roomId), HttpStatus.NOT_FOUND);
        }

        Room room = r.get();
        room.setUser2Email(user2Email);

        roomRepo.save(room);
    }
}
