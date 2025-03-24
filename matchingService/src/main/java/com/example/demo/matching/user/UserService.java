package com.example.demo.matching.user;

import com.example.demo.exception.ApiRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User getUser(String email) {
        return userRepo.findById(email).orElseThrow(() ->
                new ApiRequestException(String.format("No user of email: %s", email), HttpStatus.NOT_FOUND)
        );
    }

    public void createUser(User user) {
        String email = user.getEmail();
        String roomId = user.getRoomId();

        Optional<User> u = userRepo.findById(email);
        if (u.isPresent()) {
            throw new ApiRequestException(String.format("Cannot create, user with the email: %s already exists", email), HttpStatus.CONFLICT);
        }

        User entry = new User(
                email,
                roomId
        );
        userRepo.save(entry);
    }

    public void deleteUser(String email) {
        Optional<User> u = userRepo.findById(email);
        if (u.isEmpty()) {
            throw new ApiRequestException(String.format("Cannot delete, user with the email: %s does not exist", email), HttpStatus.NOT_FOUND);
        }

        userRepo.deleteById(email);
    }
}
