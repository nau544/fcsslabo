package com.example.backend.repository;

import com.example.backend.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    // 追加: id, name, email いずれかに部分一致するユーザーを検索
    @Query("SELECT u FROM AppUser u WHERE " +
           "CAST(u.id AS string) LIKE %:keyword% OR " +
           "u.name LIKE %:keyword% OR " +
           "u.email LIKE %:keyword%")
    List<AppUser> searchByKeyword(@Param("keyword") String keyword);
} 