package com.example.demo.findingGame.roomPOV;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindingGameRoomRepo extends JpaRepository<FindingGameRoom, String> {
}
