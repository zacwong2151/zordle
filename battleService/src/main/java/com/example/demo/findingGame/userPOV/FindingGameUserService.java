package com.example.demo.findingGame.userPOV;

import com.example.demo.exception.ApiRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class FindingGameUserService {
    final FindingGameUserRepo findingGameUserRepo;

    public FindingGameUserService(FindingGameUserRepo findingGameUserRepo) {
        this.findingGameUserRepo = findingGameUserRepo;
    }

    public FindingGameUser getUser(String email) {
        return findingGameUserRepo.findById(email).orElse(null);
    }

    public void createUser(FindingGameUser user) {
        String email = user.getEmail();
        String roomId = user.getRoomId();

        if (getUser(email) != null) {
            throw new ApiRequestException(String.format("Cannot create, user with the email: %s already exists", email), HttpStatus.CONFLICT);
        }

        FindingGameUser entry = new FindingGameUser(
                email,
                roomId
        );
        findingGameUserRepo.save(entry);
    }

    public void deleteUser(String email) {
        if (getUser(email) == null) {
            throw new ApiRequestException(String.format("Cannot delete, user with the email: %s does not exist", email), HttpStatus.NOT_FOUND);
        }

        findingGameUserRepo.deleteById(email);
    }
}
