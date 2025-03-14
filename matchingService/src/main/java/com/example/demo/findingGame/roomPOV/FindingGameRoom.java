package com.example.demo.findingGame.roomPOV;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "finding_game_room")
public class FindingGameRoom {
    @Id
    @NotBlank(message = "field cannot be null or blank")
    private String roomId;

    @NotBlank(message = "field cannot be null or blank")
    private String user1Email;

    private String user2Email;

    public FindingGameRoom() {
    }

    public FindingGameRoom(String roomId, String user1Email, String user2Email) {
        this.roomId = roomId;
        this.user1Email = user1Email;
        this.user2Email = user2Email;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getUser1Email() {
        return user1Email;
    }

    public void setUser1Email(String user1Email) {
        this.user1Email = user1Email;
    }

    public String getUser2Email() {
        return user2Email;
    }

    public void setUser2Email(String user2Email) {
        this.user2Email = user2Email;
    }

    @Override
    public String toString() {
        return "FindingGameRoom{" +
                "roomId='" + roomId + '\'' +
                ", user1Email='" + user1Email + '\'' +
                ", user2Email='" + user2Email + '\'' +
                '}';
    }
}
