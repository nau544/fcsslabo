package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletOutputStream;
import java.io.*;
import java.util.List;
import java.util.Comparator;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // ← 追加
public class UserExcelDownloadController {

    @Autowired
    private UserService userService;

    @GetMapping("/download-user-excel")
    public void downloadUserExcel(HttpServletResponse response) throws IOException {
        InputStream is = getClass().getClassLoader().getResourceAsStream("template/user_template.xlsx");
        if (is == null) {
            throw new FileNotFoundException("テンプレートファイルが見つかりません: template/user_template.xlsx");
        }
        try (XSSFWorkbook workbook = new XSSFWorkbook(is)) {

            XSSFSheet sheet = workbook.getSheetAt(0);

            // DBからユーザー情報を取得
            List<User> users = userService.getAllUsers();

            // データ書き込み開始行（例：7行目 index=6）
            int startRow = 6;
            for (int i = 0; i < users.size(); i++) {
                int rowIndex = startRow + i;
                XSSFRow row = sheet.getRow(rowIndex);
                if (row == null) {
                    row = sheet.createRow(rowIndex);
                    // スタイルをコピー
                    for (int col = 1; col <= 4; col++) {
                        XSSFCell templateCell = sheet.getRow(6).getCell(col); // 罫線や書式が設定されている行
                        XSSFCell newCell = row.createCell(col);
                        if (templateCell != null) {
                            newCell.setCellStyle(templateCell.getCellStyle());
                        }
                    }
                }

                User user = users.get(i);

                // 既存セルがあれば上書き、なければcreateCell
                XSSFCell cell1 = row.getCell(1) != null ? row.getCell(1) : row.createCell(1);
                XSSFCell cell2 = row.getCell(2) != null ? row.getCell(2) : row.createCell(2);
                XSSFCell cell3 = row.getCell(3) != null ? row.getCell(3) : row.createCell(3);
                XSSFCell cell4 = row.getCell(4) != null ? row.getCell(4) : row.createCell(4);

                cell1.setCellValue(user.getId()); // user.getId()がLong型やint型の場合
                cell2.setCellValue(user.getName());
                cell3.setCellValue(user.getEmail());
                cell4.setCellValue(user.getCreatedAt().toString());
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=user_info.xlsx");
            try (ServletOutputStream os = response.getOutputStream()) {
                workbook.write(os);
            }
        }
    }

    // 選択されたユーザーのみをダウンロードするエンドポイント
    @PostMapping("/download-selected-users-excel")
    @CrossOrigin(origins = "http://localhost:3000") // ← 追加
    public void downloadSelectedUsersExcel(@RequestBody List<Long> selectedUserIds, HttpServletResponse response) throws IOException {
        if (selectedUserIds == null || selectedUserIds.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        InputStream is = getClass().getClassLoader().getResourceAsStream("template/user_template.xlsx");
        if (is == null) {
            throw new FileNotFoundException("テンプレートファイルが見つかりません: template/user_template.xlsx");
        }
        
        try (XSSFWorkbook workbook = new XSSFWorkbook(is)) {
            XSSFSheet sheet = workbook.getSheetAt(0);

            // 選択されたユーザーIDに対応するユーザー情報を取得
            List<User> selectedUsers = userService.getUsersByIds(selectedUserIds);

            // ★ここでID昇順にソート
            selectedUsers.sort(Comparator.comparing(User::getId));

            // データ書き込み開始行（例：7行目 index=6）
            int startRow = 6;
            for (int i = 0; i < selectedUsers.size(); i++) {
                int rowIndex = startRow + i;
                XSSFRow row = sheet.getRow(rowIndex);
                if (row == null) {
                    row = sheet.createRow(rowIndex);
                    // スタイルをコピー
                    for (int col = 1; col <= 4; col++) {
                        XSSFCell templateCell = sheet.getRow(6).getCell(col); // 罫線や書式が設定されている行
                        XSSFCell newCell = row.createCell(col);
                        if (templateCell != null) {
                            newCell.setCellStyle(templateCell.getCellStyle());
                        }
                    }
                }

                User user = selectedUsers.get(i);

                // 既存セルがあれば上書き、なければcreateCell
                XSSFCell cell1 = row.getCell(1) != null ? row.getCell(1) : row.createCell(1);
                XSSFCell cell2 = row.getCell(2) != null ? row.getCell(2) : row.createCell(2);
                XSSFCell cell3 = row.getCell(3) != null ? row.getCell(3) : row.createCell(3);
                XSSFCell cell4 = row.getCell(4) != null ? row.getCell(4) : row.createCell(4);

                cell1.setCellValue(user.getId());
                cell2.setCellValue(user.getName());
                cell3.setCellValue(user.getEmail());
                cell4.setCellValue(user.getCreatedAt().toString());
            }

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=selected_users.xlsx");
            try (ServletOutputStream os = response.getOutputStream()) {
                workbook.write(os);
            }
        }
    }
}
