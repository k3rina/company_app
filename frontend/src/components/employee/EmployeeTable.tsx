import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import edit from '../../assets/edit.svg';
import { EmployeeForm } from './types/Employee';
import ModalEmployee from './ModalEmployee';
import { deleteEmployee } from './employeeSlice';
import '../common/styles/sharedStyles.css';
import { updateEmployeeCount } from '../company/companySlice';

interface EmployeeTableProps {
  selectedCompanyIds: number[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  selectedCompanyIds,
}) => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((store) => store.employees);
  const { companies } = useAppSelector((store) => store.companies);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    Record<number, boolean>
  >(
    employees.reduce((acc, employee) => {
      acc[employee.id] = false;
      return acc;
    }, {} as Record<number, boolean>)
  );
  const [selectedEmployee, setSelectedEmployee] = useState<
    EmployeeForm | undefined
  >(undefined);

  const handleSelectAll = () => {
    const updatedSelectAll = !selectAll;

    setSelectAll(updatedSelectAll);

    setSelectedCheckboxes((prev) => {
      const updatedCheckboxes: Record<number, boolean> = {};

      const filteredEmployees = selectedCompanyIds.length
        ? employees.filter((employee) =>
            selectedCompanyIds.includes(employee.companyId)
          )
        : employees;

      filteredEmployees.forEach((employee) => {
        updatedCheckboxes[employee.id] = updatedSelectAll;
      });

      return updatedCheckboxes;
    });
  };

  const handleCheckboxChange = (employeeId: number) => {
    setSelectedCheckboxes((prev) => {
      const updatedCheckboxes = { ...prev, [employeeId]: !prev[employeeId] };

      const allSelected = Object.values(updatedCheckboxes).every(
        (value) => value
      );
      const atLeastOneUnchecked = Object.values(updatedCheckboxes).some(
        (value) => !value
      );

      if (allSelected) {
        setSelectAll(true);
      } else if (atLeastOneUnchecked) {
        setSelectAll(false);
      }

      return updatedCheckboxes;
    });
  };

  const handleEditClick = (employee: EmployeeForm) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(undefined);
    setIsModalOpen(false);
  };

  const filteredEmployees = selectedCompanyIds.length
    ? employees.filter((employee) =>
        selectedCompanyIds.includes(employee.companyId)
      )
    : employees;

  const handleAddEmployee = () => {
    console.log('Handling Add Employee...');
    setIsModalOpen(true);
    console.log('isModalOpen:', isModalOpen);
  };

  const handleDelete = async () => {
    const selectedEmployeesIds = Object.entries(selectedCheckboxes)
      .filter(([id, isSelected]) => isSelected)
      .map(([id]) => parseInt(id, 10));

    if (selectedEmployeesIds.length === 0) {
      console.log('No employees selected for deletion');
      return;
    }

    try {
      await dispatch(deleteEmployee(selectedEmployeesIds));

      setSelectedCheckboxes((prev) =>
        Object.fromEntries(
          Object.entries(prev).filter(
            ([id]) => !selectedEmployeesIds.includes(parseInt(id, 10))
          )
        )
      );

      setSelectAll(false);

      const deletedEmployeeCount = selectedEmployeesIds.length;

      companies.forEach((company) => {
        const employeesInCompany = employees.filter(
          (employee) =>
            employee.companyId === company.id &&
            !selectedEmployeesIds.includes(employee.id)
        );

        const updatedCount = employeesInCompany.length;

        console.log(
          'Updating employee count for company:',
          company.id,
          'New count:',
          updatedCount
        );

        dispatch(
          updateEmployeeCount({
            companyId: company.id,
            employee_count: updatedCount,
          })
        );
      });

      console.log('Number of deleted employees:', deletedEmployeeCount);
    } catch (error) {
      console.error('Error deleting employees:', error);
    }
  };

  return (
    <div className="employee-table-container">
      <div className="table-header">
        <button onClick={handleAddEmployee}>Добавить</button>
        <button onClick={handleDelete}>Удалить</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              Выделить всё
            </th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Должность</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>
                Сотрудники не найдены
              </td>
            </tr>
          ) : (
            filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                className={
                  selectedCheckboxes[employee.id] ? 'selected-row' : ''
                }
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCheckboxes[employee.id] || false}
                    onChange={() => handleCheckboxChange(employee.id)}
                  />
                </td>
                <td>{employee.lastName}</td>
                <td>{employee.firstName}</td>
                <td>{employee.position}</td>
                <td>
                  <img
                    className="edit_img"
                    src={edit}
                    alt="Edit"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEditClick(employee)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isModalOpen && (
        <ModalEmployee
          isOpen={true}
          onClose={handleCloseModal}
          initialFormData={selectedEmployee}
          isAdding={!selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
