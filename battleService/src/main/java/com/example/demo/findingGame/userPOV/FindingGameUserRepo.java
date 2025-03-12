package com.example.demo.findingGame.userPOV;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FindingGameUserRepo extends JpaRepository<FindingGameUser, String> {
}
