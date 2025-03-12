package com.example.demo.findingGame.userPOV;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "finding_game_user")
public class FindingGameUser {
    @Id
    private String email;
    private String roomId;

    public FindingGameUser() {
    }

    public FindingGameUser(String email, String roomId) {
        this.email = email;
        this.roomId = roomId;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    @Override
    public String toString() {
        return "FindingGameUser{" +
                "email='" + email + '\'' +
                ", roomId='" + roomId + '\'' +
                '}';
    }
}
