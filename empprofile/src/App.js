import React, { useState, useEffect } from 'react';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeList from './pages/EmployeeList';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const newBtnClicked = () => {
    setSelectedEmployee();
    toggleModal();
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    toggleModal();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('modal')) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="container mt-4 p-0">
      <div className="row">
        <div className="col-8">
          <div className="h3">Employee List</div>
        </div>
        <div className="col-4">
          <button onClick={newBtnClicked} className="btn btn-primary float-end">
            Add Employee
          </button>
        </div>
      </div>
      <div className="row">
        <EmployeeList onRowClick={handleRowClick} />
      </div>

      {isModalOpen && (
        <div className={`modal ${isModalOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <div className="container">
              <div className="row mb-2">
                <div className="col-8">
                  <label className="h3">{selectedEmployee ? 'Edit Employee' : 'Register New Employee'}</label>
                </div>
                <div className="col-4">
                  <button
                    onClick={toggleModal}
                    className="btn btn-danger float-end"
                  >
                    X
                  </button>
                </div>
              </div>
              <EmployeeForm closeModal={toggleModal} employee={selectedEmployee} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
