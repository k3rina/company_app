import { AddCompany, Company } from '../components/company/types/Company';
import { AddEmployee, Employee } from '../components/employee/types/Employee';

interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

export const loadCompaniesFetch = async (): Promise<Company[]> => {
  try {
    const res = await fetch('/companies');
    return res.json();
  } catch (error) {
    console.error('Error loading companies:', error);
    throw error;
  }
};

export const loadEmployeesFetch = async (): Promise<Employee[]> => {
  try {
    const res = await fetch('/employees');
    return res.json();
  } catch (error) {
    console.error('Error loading employees:', error);
    throw error;
  }
};

export const updateCompanyFetch = async (
  companyId: number,
  updatedData: Partial<Company>
): Promise<Company> => {
  try {
    const res = await fetch(`/companies/${companyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    console.log(res, 'hjhj');

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Failed to update company. Status: ${res.status}`);
    }
  } catch (error) {
    console.error('Error updating company:', error);
    throw error;
  }
};

export const updateEmployeeFetch = async (
  employeeId: number,
  updatedData: Partial<Employee>
): Promise<Employee> => {
  try {
    const res = await fetch(`/employees/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Failed to update employee. Status: ${res.status}`);
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const addCompanyFetch = async (
  company: AddCompany
): Promise<Company> => {
  try {
    const res = await fetch('/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Failed to add company. Status: ${res.status}`);
    }
  } catch (error) {
    console.error('Error adding company:', error);
    throw error;
  }
};

export const addEmployeeFetch = async (
  employee: AddEmployee
): Promise<Employee> => {
  try {
    const res = await fetch('/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Failed to add employee. Status: ${res.status}`);
    }
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const deleteCompaniesFetch = async (companyIds: number[]) => {
  try {
    const response = await fetch('http://localhost:3000/companies', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyIds }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete companies. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(`Error deleting companies: ${customError.message}`);
  }
};

export const deleteEmployeesFetch = async (employeeIds: number[]) => {
  try {
    const response = await fetch('http://localhost:3000/employees', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeIds }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete employees. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(`Error deleting emloyees: ${customError.message}`);
  }
};
