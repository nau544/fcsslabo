package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ユーザー一覧取得（検索機能付き）
    @GetMapping
    public List<User> getUsers(@RequestParam(required = false) String keyword) {
        if (keyword != null && !keyword.trim().isEmpty()) {
            // キーワードが指定されている場合は名前、メールアドレス、IDの全てで検索
            return userRepository.findByNameOrEmailOrIdContainingIgnoreCase(keyword.trim());
        } else {
            // キーワードが指定されていない場合は全件取得
            return userRepository.findAll();
        }
    }

    // ユーザー追加
    @PostMapping
    public User createUser(@RequestBody User user) {
        // 作成日時を自動設定
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }
}