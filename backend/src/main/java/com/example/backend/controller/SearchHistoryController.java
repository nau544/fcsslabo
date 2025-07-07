package com.example.backend.controller;

import com.example.backend.service.SearchHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search-history")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchHistoryController {
    @Autowired
    private SearchHistoryService service;

    @PostMapping
    public void saveSearch(@RequestBody String keyword) {
        service.save(keyword);
    }
}