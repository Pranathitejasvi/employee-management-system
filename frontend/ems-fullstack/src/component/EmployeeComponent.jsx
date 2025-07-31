import React, { useState, useEffect } from 'react';
import { savedEmployee, updateDataEmployee, editEmployee } from '../service/EmployeeService';
import '../style/employeeform.css';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeComponent() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // ✅ Redirect to login if not logged in
        if (!localStorage.getItem("isLoggedIn")) {
            navigate("/login");
        }

        if (id) {
            editEmployee(id)
                .then((response) => {
                    const emp = response.data;
                    setFirstName(emp.firstName || '');
                    setLastName(emp.lastName || '');
                    setEmail(emp.email || '');
                    setSalary(emp.salary || '');
                    setDesignation(emp.designation || '');
                    setDepartment(emp.department || '');
                })
                .catch((error) => console.error(error));
        }
    }, [id, navigate]);

    function pageTitle() {
        return <h4 className='title'>{id ? 'Update Employee' : 'Add Employee'}</h4>;
    }

    function saveEmployee(e) {
        e.preventDefault();

        if (!firstName || !lastName || !email || !salary || !designation || !department) {
            setError("⚠ Please fill in all fields!");
            return;
        }

        const employee = {
            firstName,
            lastName,
            email,
            salary: parseFloat(salary),
            designation,
            department
        };

        if (id) {
            updateDataEmployee(id, employee)
                .then(() => navigate('/'))
                .catch((error) => {
                    console.error(error);
                    setError("❌ Failed to update employee!");
                });
        } else {
            savedEmployee(employee)
                .then(() => navigate('/'))
                .catch((error) => {
                    console.error(error);
                    setError("❌ Failed to save employee!");
                });
        }
    }

    return (
        <div className='st-ba'>
            <div className='container d-flex justify-content-center align-items-center'>
                <div className='text-center card card-top' style={{ maxWidth: "500px", width: "100%" }}>
                    <div className='card-head'>{pageTitle()}</div>
                    <div className='card-body'>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form>
                            <div className='form-group mb-3'>
                                <input
                                    type='text'
                                    placeholder='Enter First Name'
                                    value={firstName}
                                    className='form-control'
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-3'>
                                <input
                                    type='text'
                                    placeholder='Enter Last Name'
                                    value={lastName}
                                    className='form-control'
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-3'>
                                <input
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    className='form-control'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-3'>
                                <input
                                    type='number'
                                    placeholder='Enter Salary'
                                    value={salary}
                                    className='form-control'
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-3'>
                                <input
                                    type='text'
                                    placeholder='Enter Designation'
                                    value={designation}
                                    className='form-control'
                                    onChange={(e) => setDesignation(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-3'>
                                <input
                                    type='text'
                                    placeholder='Enter Department'
                                    value={department}
                                    className='form-control'
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                            </div>
                            <button className='btn btn-success w-100' onClick={saveEmployee}>
                                {id ? "Update" : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeComponent;