package com.employeesystem.emsbackend.controller;

import com.employeesystem.emsbackend.entity.Employee;
import com.employeesystem.emsbackend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/emp")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService; // ✅ Autowired instead of final

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee emp = employeeService.addEmployee(employee);
        return new ResponseEntity<>(emp, HttpStatus.CREATED);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Employee> findEmployeeById(@PathVariable("id") Long id) {
        Employee emp = employeeService.findEmployeeById(id);
        return ResponseEntity.ok(emp);
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployee() {
        List<Employee> e = employeeService.getAllEmployee();
        return ResponseEntity.ok(e);
    }

    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Long id,
                                                   @RequestBody Employee updateEmployee) {
        Employee emp = employeeService.updateEmployee(id, updateEmployee);
        return ResponseEntity.ok(emp);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteById(@PathVariable("id") Long id) {
        employeeService.deleteEmployeeById(id);
        return ResponseEntity.ok("Employee Deleted Successfully");
    }

    @GetMapping("/email-id/{mail}")
    public ResponseEntity<Employee> findByEmployeeEmail(@PathVariable("mail") String email) {
        return ResponseEntity.ok(employeeService.findEmployeeByEmail(email));
    }
}
