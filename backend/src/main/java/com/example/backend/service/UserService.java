package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.dto.UserWithMasterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAllByOrderByIdAsc();
    }

    // 選択されたユーザーIDのリストからユーザー情報を取得
    public List<User> getUsersByIds(List<Long> userIds) {
        return userRepository.findAllById(userIds);
    }

    public List<UserWithMasterDto> getUsersWithMaster(String keyword) {
        return userRepository.findUsersWithMaster(keyword);
    }
}
