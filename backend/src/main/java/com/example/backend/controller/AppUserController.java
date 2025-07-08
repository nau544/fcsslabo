package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;
import com.example.backend.repository.AppUserRepository;
import com.example.backend.entity.AppUser;

@RestController
@RequestMapping("/api/appusers")
public class AppUserController {

    @Autowired
    private AppUserRepository appUserRepository;

    // ユーザー検索API
    @GetMapping("/search")
    public List<AppUser> searchAppUsers(@RequestParam String keyword) {
        return appUserRepository.searchByKeyword(keyword);
    }
} 