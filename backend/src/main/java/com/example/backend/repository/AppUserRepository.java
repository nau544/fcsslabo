package com.example.backend.repository;

import com.example.backend.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    // 必要に応じてカスタムメソッドを追加できます
} 