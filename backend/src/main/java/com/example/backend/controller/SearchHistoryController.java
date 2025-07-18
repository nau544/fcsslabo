package com.example.backend.controller;

import com.example.backend.entity.SearchHistory;
import com.example.backend.service.SearchHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;

@RestController
@RequestMapping("/api/search-history")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchHistoryController {

    @Autowired
    private SearchHistoryService searchHistoryService;

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
                "field", "keyword",
                "headerName", "検索キーワード",
                "width", "50%",
                "editable", true,
                "type", "text"
            ),
            Map.of(
                "field", "searchedAt",
                "headerName", "検索日時",
                "width", "40%",
                "editable", false,
                "type", "datetime"
            )
        );
        
        structure.put("columns", columns);
        structure.put("tableName", "search_history");
        structure.put("primaryKey", "id");
        
        return structure;
    }

    @GetMapping
    public List<SearchHistory> getAllSearchHistory() {
        return searchHistoryService.getAllSearchHistory();
    }

    @PostMapping
    public void saveSearch(@RequestBody String keyword) {
        searchHistoryService.save(keyword);
    }
}