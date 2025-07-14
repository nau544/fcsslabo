package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // 名前で検索（大文字小文字を区別しない）
    List<User> findByNameContainingIgnoreCase(String name);
    
    // メールアドレスでも検索できるようにする場合
    List<User> findByEmailContainingIgnoreCase(String email);
    
    // 名前、メールアドレス、またはIDで検索
    @Query("SELECT u FROM User u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR CAST(u.id AS string) LIKE CONCAT('%', :keyword, '%')")
    List<User> findByNameOrEmailOrIdContainingIgnoreCase(@Param("keyword") String keyword);

    List<User> findAllByOrderByIdAsc();
}
