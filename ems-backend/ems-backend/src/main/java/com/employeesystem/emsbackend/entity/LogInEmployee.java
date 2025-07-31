package com.employeesystem.emsbackend.entity;

public class LogInEmployee {

    private String firstName;
    private String email;

    // ✅ Default Constructor
    public LogInEmployee() {
    }

    // ✅ Parameterized Constructor
    public LogInEmployee(String firstName, String email) {
        this.firstName = firstName;
        this.email = email;
    }

    // ✅ Getters
    public String getFirstName() {
        return firstName;
    }

    public String getEmail() {
        return email;
    }

    // ✅ Setters
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
