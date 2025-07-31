package com.employeesystem.emsbackend.service;

import com.employeesystem.emsbackend.entity.Employee;
import com.employeesystem.emsbackend.exception.ResourceNotFoundException;
import com.employeesystem.emsbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // ✅ Add Employee
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // ✅ Find Employee By Id (throws ResourceNotFoundException)
    public Employee findEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee Id " + employeeId + " not found"));
    }

    // ✅ Get All Employees
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    // ✅ Update Employee (Now updates new fields too)
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee emp = findEmployeeById(id);

        emp.setFirstName(updatedEmployee.getFirstName());
        emp.setLastName(updatedEmployee.getLastName());
        emp.setEmail(updatedEmployee.getEmail());
        emp.setSalary(updatedEmployee.getSalary());               // ✅ Added
        emp.setDesignation(updatedEmployee.getDesignation());     // ✅ Added
        emp.setDepartment(updatedEmployee.getDepartment());       // ✅ Added

        return employeeRepository.save(emp);
    }

    // ✅ Delete Employee By Id
    public void deleteEmployeeById(Long id) {
        boolean exist = employeeRepository.existsById(id);
        if (!exist) {
            throw new ResourceNotFoundException("Employee not found with Id " + id);
        }
        employeeRepository.deleteById(id);
    }

    // ✅ Find By Email
    public Employee findEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
}
