import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { AddEmployee, EmployeeForm } from './types/Employee';
import { addEmployee, updateEmployee } from './employeeSlice';

interface ModalEmployeeProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormData?: EmployeeForm;
}

interface ModalEmployeeProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormData?: EmployeeForm;
  isAdding?: boolean;
}
const ModalEmployee: React.FC<ModalEmployeeProps> = ({
  isOpen,
  onClose,
  initialFormData,
  isAdding,
}) => {
  const dispatch = useAppDispatch();
  const [lastName, setLastName] = useState(
    isAdding ? '' : initialFormData?.lastName || ''
  );
  const [firstName, setFirstName] = useState(
    isAdding ? '' : initialFormData?.firstName || ''
  );
  const [position, setPosition] = useState(
    isAdding ? '' : initialFormData?.position || ''
  );
  const [companyName, setCompanyName] = useState(
    isAdding ? '' : initialFormData?.companyName || ''
  );

  const handleSave = async () => {
    try {
      if (isAdding) {
        const newEmployee: AddEmployee = {
          lastName,
          firstName,
          position,
          companyName,
        };

        const addedEmployee = await dispatch(addEmployee(newEmployee));

        console.log('Added Employee Data:', addedEmployee);
      } else {
        console.log('Updating existing employee...');
        const employeeId = initialFormData?.id;

        if (employeeId === undefined) {
          console.error('Employee ID is undefined');
          return;
        }

        const updatedData: EmployeeForm = {
          id: employeeId,
          lastName,
          firstName,
          position,
        };

        console.log('Updated Employee Data:', updatedData);

        const updatedEmployee = await dispatch(updateEmployee(updatedData));

        console.log('Updated Employee Data:', updatedEmployee);
      }

      onClose();
    } catch (error) {
      console.error('Error updating/adding employee:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>
          {isAdding
            ? 'Добавить Сотрудника'
            : 'Редактировать данные о сотруднике'}
        </h2>

        <form className="employee-form">
          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              className="form-input"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              className="form-input"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Должность:</label>
            <input
              type="text"
              name="position"
              value={position}
              className="form-input"
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          {isAdding && (
            <div className="form-group">
              <label>Название Компании:</label>
              <input
                type="text"
                name="companyName"
                value={companyName}
                className="form-input"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          )}
          <button className="form-button" onClick={handleSave}>
            {initialFormData ? 'Редактировать' : 'Добавить'}
          </button>{' '}
        </form>
      </div>
    </div>
  );
};

export default ModalEmployee;
