import React from 'react';
import useEmployees from '../hooks/useEmployees';

const EmployeeList = ({ onRowClick }) => {
    const handleRowClick = (employee) => {
        onRowClick(employee);
    };

    const employees = useEmployees();

    return (
        <div className='container mt-3'>
            <table className="table table-bordered table-striped table-hover-custom">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Race</th>
                        <th>Marital Status</th>
                        <th>Phone No</th>
                        <th>Address</th>
                        <th>DOB</th>
                        <th>Nationality</th>
                        <th>Hire Date</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan="11" className="text-center">No employees found</td>
                        </tr>
                    ) : (
                        employees.map((emp, index) => (
                            <tr key={index}
                                data-id={emp.id}
                                onClick={() => handleRowClick(emp)}
                            >
                                <td>{emp.employeeName}</td>
                                <td>{emp.department}</td>
                                <td>{emp.email}</td>
                                <td>{emp.gender}</td>
                                <td>{emp.race}</td>
                                <td>{emp.maritalStatus}</td>
                                <td>{emp.phoneNo}</td>
                                <td>{emp.address}</td>
                                <td>{emp.dob}</td>
                                <td>{emp.nationality}</td>
                                <td>{emp.hireDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
