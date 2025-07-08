package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    // 追加: id, name, email いずれかに部分一致するユーザーを検索
    @Query("SELECT u FROM User u WHERE " +
           "CAST(u.id AS string) LIKE %:keyword% OR " +
           "u.name LIKE %:keyword% OR " +
           "u.email LIKE %:keyword%")
    List<User> searchByKeyword(@Param("keyword") String keyword);
}