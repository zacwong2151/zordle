package com.example.demo.findingGame.userPOV;

import com.example.demo.exception.ApiRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FindingGameUserService {
    final FindingGameUserRepo findingGameUserRepo;

    public FindingGameUserService(FindingGameUserRepo findingGameUserRepo) {
        this.findingGameUserRepo = findingGameUserRepo;
    }

    public FindingGameUser getUser(String email) {
        return findingGameUserRepo.findById(email).orElseThrow(() ->
                new ApiRequestException(String.format("No user of email: %s", email), HttpStatus.NOT_FOUND)
        );
    }

    public void createUser(FindingGameUser user) {
        String email = user.getEmail();
        String roomId = user.getRoomId();

        Optional<FindingGameUser> u = findingGameUserRepo.findById(email);
        if (u.isPresent()) {
            throw new ApiRequestException(String.format("Cannot create, user with the email: %s already exists", email), HttpStatus.CONFLICT);
        }

        FindingGameUser entry = new FindingGameUser(
                email,
                roomId
        );
        findingGameUserRepo.save(entry);
    }

    public void deleteUser(String email) {
        Optional<FindingGameUser> u = findingGameUserRepo.findById(email);
        if (u.isEmpty()) {
            throw new ApiRequestException(String.format("Cannot delete, user with the email: %s does not exist", email), HttpStatus.NOT_FOUND);
        }

        findingGameUserRepo.deleteById(email);
    }
}
