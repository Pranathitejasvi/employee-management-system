package com.employeesystem.emsbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password; // Will store hashed password

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }

    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
}
