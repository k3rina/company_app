import React, { useEffect, useState } from 'react';
import '../common/styles/sharedStyles.css';
import { AddCompany, Company, CompanyForm } from './types/Company';

import { addCompany, updateCompany } from './companySlice';
import { useAppDispatch } from '../../redux/store';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormData?: Company;
}

const ModalCompany: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  initialFormData,
}) => {
  const [formData, setFormData] = useState({
    name: initialFormData?.name || '',
    address: initialFormData?.address || '',
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setFormData({
      name: initialFormData?.name || '',
      address: initialFormData?.address || '',
    });
  }, [initialFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (initialFormData) {
        const updatedData: CompanyForm = {
          id: initialFormData.id,
          name: formData.name,
          address: formData.address,
        };

        await dispatch(updateCompany(updatedData));
      } else {
        const newCompanyData: AddCompany = {
          name: formData.name,
          address: formData.address,
        };

        await dispatch(addCompany(newCompanyData));
      }

      onClose();
    } catch (error) {
      console.error('Error saving company data:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>
          {initialFormData
            ? 'Редактировать данные о компании'
            : 'Добавить новую компанию'}
        </h2>

        <form className="company-form">
          <div className="form-group">
            <label>Название компании:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className="form-input"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Адрес:</label>
            <input
              type="text"
              name="address"
              className="form-input"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <button className="form-button" onClick={handleSave}>
            {initialFormData ? 'Редактировать' : 'Добавить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCompany;
