import React, { useEffect, useState } from 'react';
import './App.css';
import CompanyTable from '../components/company/CompanyTable';

import { useAppDispatch } from '../redux/store';
import { loadCompanies } from '../components/company/companySlice';
import { loadEmployees } from '../components/employee/employeeSlice';
import EmployeeTable from '../components/employee/EmployeeTable';

function App() {
  const dispatch = useAppDispatch();

  const storedIds = localStorage.getItem('selectedCompanyIds');
  const initialSelectedCompanyIds = storedIds ? JSON.parse(storedIds) : [];

  const [selectedCompanyIds, setSelectedCompanyIds] = useState<number[]>(
    initialSelectedCompanyIds
  );

  useEffect(() => {
    dispatch(loadCompanies());
    dispatch(loadEmployees());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="table-container">
        <CompanyTable
          selectedCompanyIds={selectedCompanyIds}
          setSelectedCompanyIds={setSelectedCompanyIds}
        />
      </div>
      {selectedCompanyIds.length > 0 && (
        <EmployeeTable selectedCompanyIds={selectedCompanyIds} />
      )}
    </div>
  );
}

export default App;
