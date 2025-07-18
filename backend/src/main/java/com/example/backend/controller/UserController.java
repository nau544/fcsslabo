package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import java.time.ZonedDateTime;
import java.time.ZoneId;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // テーブル構造のメタデータを取得するAPI
    @GetMapping("/table-structure")
    public Map<String, Object> getTableStructure() {
        Map<String, Object> structure = new HashMap<>();
        
        // カラム定義
        List<Map<String, Object>> columns = Arrays.asList(
            Map.of(
                "field", "id",
                "headerName", "ID",
                "width", "10%",
                "editable", false,
                "type", "number"
            ),
            Map.of(
                "field", "username",
                "headerName", "名前",
                "width", "25%",
                "editable", true,
                "type", "text"
            ),
            Map.of(
                "field", "email",
                "headerName", "メールアドレス",
                "width", "35%",
                "editable", true,
                "type", "email"
            ),
            Map.of(
                "field", "createdAt",
                "headerName", "作成日時",
                "width", "20%",
                "editable", false,
                "type", "datetime"
            )
        );
        
        structure.put("columns", columns);
        structure.put("tableName", "userstable");
        structure.put("primaryKey", "id");
        
        return structure;
    }

    // ユーザー一覧取得（検索機能付き）
    @GetMapping
    public List<User> getUsers(@RequestParam(required = false) String keyword) {
        if (keyword != null && !keyword.trim().isEmpty()) {
            // キーワードが指定されている場合はユーザー名、メールアドレス、IDの全てで検索
            return userRepository.findByUsernameOrEmailOrIdContainingIgnoreCase(keyword.trim());
        } else {
            // キーワードが指定されていない場合は全件取得
            return userRepository.findAll();
        }
    }

    // ユーザー追加
    @PostMapping
    public User createUser(@RequestBody User user) {
        // JSTで現在時刻を取得
        ZonedDateTime jstNow = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
        user.setCreatedAt(jstNow.toLocalDateTime());
        return userRepository.save(user);
    }

    // ユーザー編集（更新）
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User updatedUser) {
        return userRepository.findById(id)
            .map(user -> {
                user.setUsername(updatedUser.getUsername());
                user.setEmail(updatedUser.getEmail());
                // 必要に応じて他のフィールドも更新
                User saved = userRepository.save(user);
                return ResponseEntity.ok(saved);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // ユーザー削除
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(user -> {
                userRepository.delete(user);
                return ResponseEntity.ok().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}