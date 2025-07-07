package com.example.backend.service;

import com.example.backend.entity.SearchHistory;
import com.example.backend.repository.SearchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchHistoryService {
    @Autowired
    private SearchHistoryRepository repository;

    public SearchHistory save(String keyword) {
        SearchHistory history = new SearchHistory(keyword, java.time.LocalDateTime.now());
        return repository.save(history);
    }
}