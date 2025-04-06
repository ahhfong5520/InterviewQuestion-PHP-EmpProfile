import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/mainstyles.css';

const EmployeeForm = ({ closeModal, employee }) => {
    const [formData, setFormData] = useState({
        id: '',
        employeeName: '',
        gender: '',
        race: '',
        maritalStatus: '',
        phoneNo: '',
        email: '',
        address: '',
        dob: '',
        nationality: '',
        hireDate: '',
        department: ''
    });
    const [nationalities, setNationalities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/backend/defaultData.php/data/nationalities')
            .then(response => setNationalities(response.data))
            .catch(error => console.error('Error fetching nationalities:', error));
    }, []);

    useEffect(() => {
        if (employee) {
            setFormData({
                id: employee.id || '',
                employeeName: employee.employeeName || '',
                gender: employee.gender || '',
                race: employee.race || '',
                maritalStatus: employee.maritalStatus || '',
                phoneNo: employee.phoneNo || '',
                email: employee.email || '',
                address: employee.address || '',
                dob: employee.dob || '',
                nationality: employee.nationality || '',
                hireDate: employee.hireDate || '',
                department: employee.department || ''
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handlePhoneChange = (e) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
        setFormData(prev => ({ ...prev, phoneNo: onlyNumbers }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/backend/employees.php/data/updateEmployee', formData, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                alert('Form submitted successfully');
                console.log(response.data);
                if (typeof closeModal === 'function') closeModal();
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor='employeeName' className='col-form-label'>Employee Name</label>
                </div>
                <div className='col'>
                    <input
                        type='text'
                        id='employeeName'
                        value={formData.employeeName}
                        onChange={handleChange}
                        className='form-control'
                        required
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor="dob" className='col-form-label'>Date of Birth</label>
                </div>
                <div className='col'>
                    <input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className='form-control'
                        max={new Date().toISOString().split('T')[0]}
                        required
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor="gender" className='col-form-label'>Gender</label>
                </div>
                <div className='col'>
                    <select
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className='form-select'
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor="race" className='col-form-label'>Race</label>
                </div>
                <div className='col'>
                    <select
                        id="race"
                        value={formData.race}
                        onChange={handleChange}
                        className='form-select'
                        required
                    >
                        <option value="">Select Race</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Malay">Malay</option>
                        <option value="Indian">Indian</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor="maritalStatus" className='col-form-label'>Marital Status</label>
                </div>
                <div className='col'>
                    <select
                        id="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        className='form-select'
                        required
                    >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                    </select>
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor="phoneNo" className='col-form-label'>Phone No.</label>
                </div>
                <div className='col'>
                    <div className='input-group'>
                        <span className="input-group-text" id="basic-addon1">+6</span>
                        <input
                            type="tel"
                            id="phoneNo"
                            value={formData.phoneNo}
                            onChange={handlePhoneChange}
                            className='form-control'
                            required
                        />
                    </div>
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor="email" className='col-form-label'>Email</label>
                </div>
                <div className='col'>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='form-control'
                        required
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor="address" className='col-form-label'>Address</label>
                </div>
                <div className='col'>
                    <textarea
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className='form-control'
                        required
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor="nationality" className='col-form-label'>Nationality</label>
                </div>
                <div className='col'>
                    <select
                        id="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className='form-select'
                        required
                    >
                        <option value="">Select Nationality</option>
                        {nationalities.map(nation => (
                            <option key={nation.id} value={nation.nationality_name}>
                                {nation.nationality_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor="hireDate" className='col-form-label'>Hire Date</label>
                </div>
                <div className='col'>
                    <input
                        type="date"
                        id="hireDate"
                        value={formData.hireDate}
                        onChange={handleChange}
                        className='form-control'
                        required
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <label htmlFor="department" className='col-form-label'>Department</label>
                </div>
                <div className='col'>
                    <select
                        id="department"
                        value={formData.department}
                        onChange={handleChange}
                        className='form-select'
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Human Resource">Human Resource</option>
                        <option value="Support">Support</option>
                    </select>
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-8'></div>
                <div className='col-4'>
                    <button className='btn btn-primary float-end' type="submit">Save</button>
                </div>
            </div>
        </form>
    );
};

export default EmployeeForm;
