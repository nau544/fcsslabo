package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ユーザー一覧取得
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ユーザー追加
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}