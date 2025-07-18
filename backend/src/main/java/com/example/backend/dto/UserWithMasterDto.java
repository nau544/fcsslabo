package com.example.backend.dto;

public class UserWithMasterDto {
    private Long id;
    private String username;
    private String email;
    private String name;
    private String genderName;
    private String departmentName;
    private String createdAt;

    // コンストラクタ
    public UserWithMasterDto(Long id, String username, String email, String name, String genderName, String departmentName, String createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.genderName = genderName;
        this.departmentName = departmentName;
        this.createdAt = createdAt;
    }

    // getter/setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getGenderName() { return genderName; }
    public void setGenderName(String genderName) { this.genderName = genderName; }
    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
} 