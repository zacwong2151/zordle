package com.example.demo.matching.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "finding-game-user")
public class User {
    @Id
    @NotBlank(message = "field cannot be null or blank")
    private String email;

    @NotBlank(message = "field cannot be null or blank")
    private String roomId;

    public User() {
    }

    public User(String email, String roomId) {
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
        return "User{" +
                "email='" + email + '\'' +
                ", roomId='" + roomId + '\'' +
                '}';
    }
}
