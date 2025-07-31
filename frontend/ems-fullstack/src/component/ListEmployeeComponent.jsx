import React, { useState, useEffect } from 'react';
import { listEmployees, deleteEmployee } from '../service/EmployeeService.js';
import { useNavigate } from 'react-router-dom';
import '../style/listemployee.css';

function ListEmployeeComponent() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // ✅ Redirect to login if not logged in
        if (!localStorage.getItem("isLoggedIn")) {
            navigate("/login");
        } else {
            getAllEmployee();
        }
    }, [navigate]);

    function getAllEmployee() {
        listEmployees()
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function addNewEmployee() {
        navigate('/add-employee');
    }

    function updateHandler(id) {
        navigate(`/update-employee/${id}`);
    }

    function deleteHandler(id) {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            deleteEmployee(id)
                .then(() => getAllEmployee())
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    // ✅ Filter employees by name, email, or department
    const filteredEmployees = employee.filter((emp) =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-primary fw-bold">Employee List</h3>
                <button className="btn btn-primary" onClick={addNewEmployee}>
                    ➕ Add Employee
                </button>
            </div>

            {/* ✅ Search Bar */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered custom-table">
                    <thead className="table-dark text-center">
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Salary</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>₹ {item.salary}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.department}</td>
                                    <td>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => updateHandler(item.id)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteHandler(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center text-muted">
                                    No Employees Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEmployeeComponent;