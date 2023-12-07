import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import '../common/styles/sharedStyles.css';
import edit from '../../assets/edit.svg';
import ModalCompany from './ModalCompany';
import { Company } from './types/Company';

import { deleteCompanies } from './companySlice';

interface CompanyTableProps {
  selectedCompanyIds: number[];
  setSelectedCompanyIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function CompanyTable({
  selectedCompanyIds: propSelectedCompanyIds,
  setSelectedCompanyIds,
}: CompanyTableProps) {
  const dispatch = useAppDispatch();
  const { companies } = useAppSelector((store) => store.companies);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    Record<number, boolean>
  >(
    companies.reduce((acc, company) => {
      acc[company.id] = false;
      return acc;
    }, {} as Record<number, boolean>)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(
    undefined
  );

  useEffect(() => {
    localStorage.setItem(
      'selectedCompanyIds',
      JSON.stringify(propSelectedCompanyIds)
    );
  }, [propSelectedCompanyIds]);

  useEffect(() => {
    const initialSelectedCheckboxes: Record<number, boolean> = {};
    companies.forEach((company) => {
      initialSelectedCheckboxes[company.id] = propSelectedCompanyIds.includes(
        company.id
      );
    });
    setSelectedCheckboxes(initialSelectedCheckboxes);
  }, [propSelectedCompanyIds, companies]);
  const handleEditClick = (company: Company) => {
    console.log('Edit icon clicked');
    setIsModalOpen(true);
    setSelectedCompany(company);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
  };

  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);

    setSelectedCheckboxes((prev) => {
      const updatedCheckboxes: Record<number, boolean> = {};
      companies.forEach((company) => {
        updatedCheckboxes[company.id] = !selectAll;
      });
      return updatedCheckboxes;
    });

    const allCompanyIds = companies.map((company) => company.id);
    setSelectedCompanyIds((prev) => (selectAll ? [] : allCompanyIds));
  };

  const handleCheckboxChange = (companyId: number) => {
    setSelectedCheckboxes((prev) => ({
      ...prev,
      [companyId]: !prev[companyId],
    }));

    setSelectedCompanyIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );

    const allChecked = Object.values(selectedCheckboxes).every(
      (isChecked) => isChecked
    );
    setSelectAll(allChecked);
  };

  const handleAddCompany = () => {
    console.log('Add Company button clicked');
    setIsModalOpen(true);
    setSelectedCompany(undefined);
  };

  const handleDelete = (propSelectedCompanyIds: number[]) => {
    console.log('Delete Company button clicked');
    if (propSelectedCompanyIds.length === 0) {
      console.log('No companies selected for deletion');
      return;
    }

    dispatch(deleteCompanies(propSelectedCompanyIds))
      .then(() => {
        console.log('Companies deleted successfully');
        setSelectAll(false);
        setSelectedCheckboxes({});
        setSelectedCompanyIds([]);
      })
      .catch((error) => {
        console.error('Error deleting companies:', error);
      });
  };

  return (
    <div className="company-table-container">
      {' '}
      <div className="table-header">
        <button onClick={handleAddCompany}>Добавить</button>
        <button onClick={() => handleDelete(propSelectedCompanyIds)}>
          Удалить
        </button>
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
            <th>Название компании</th>
            <th>Кол-во сотрудников</th>
            <th>Адрес</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className={selectedCheckboxes[company.id] ? 'selected-row' : ''}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedCheckboxes[company.id] || false}
                  onChange={() => handleCheckboxChange(company.id)}
                />
              </td>
              <td>{company.name}</td>
              <td>{company.employee_count}</td>
              <td>{company.address}</td>
              <td>
                {' '}
                <img
                  className="edit_img"
                  src={edit}
                  alt="Edit"
                  onClick={() => handleEditClick(company)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ModalCompany
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialFormData={selectedCompany}
        />
      )}
    </div>
  );
}

export default CompanyTable;
