package com.example.backend.repository;

import com.example.backend.entity.User;
import com.example.backend.dto.UserWithMasterDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // ユーザー名で検索（大文字小文字を区別しない）
    List<User> findByUsernameContainingIgnoreCase(String username);
    
    // メールアドレスでも検索できるようにする場合
    List<User> findByEmailContainingIgnoreCase(String email);
    
    // ユーザー名、メールアドレス、またはIDで検索
    @Query("SELECT u FROM User u WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR CAST(u.id AS string) LIKE CONCAT('%', :keyword, '%')")
    List<User> findByUsernameOrEmailOrIdContainingIgnoreCase(@Param("keyword") String keyword);

    List<User> findAllByOrderByIdAsc();

    @Query("""
        SELECT new com.example.backend.dto.UserWithMasterDto(
            u.id, u.username, u.email, u.name,
            g.genderName, d.departmentName,
            CAST(u.createdAt AS string)
        )
        FROM User u
        LEFT JOIN GenderMst g ON u.genderId = g.id
        LEFT JOIN DepartmentMst d ON u.departmentId = d.id
        WHERE (
            :keyword IS NULL OR :keyword = ''
            OR LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR CAST(u.id AS string) LIKE CONCAT('%', :keyword, '%')
        )
        ORDER BY u.id ASC
    """)
    List<UserWithMasterDto> findUsersWithMaster(@Param("keyword") String keyword);
}
