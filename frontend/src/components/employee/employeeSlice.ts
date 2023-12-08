import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../../App/api';
import { EmployeeState } from './types/State';
import { AddEmployee, Employee, EmployeeForm } from './types/Employee';

import { updateEmployeeCount } from '../company/companySlice';
import '../common/styles/sharedStyles.css';

const initialState: EmployeeState = {
  employees: [],
  error: undefined,
};

export const loadEmployees = createAsyncThunk('employees/load', () =>
  api.loadEmployeesFetch()
);

export const updateEmployee = createAsyncThunk(
  'employees/update',
  async (updatedData: EmployeeForm) => {
    return api.updateEmployeeFetch(updatedData.id, updatedData);
  }
);

export const addEmployee = createAsyncThunk(
  'employees/add',
  async (newEmployee: AddEmployee) => {
    const res = await fetch('/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Failed to add employee. Status: ${res.status}`);
    }
  }
);

type DeleteEmployeePayload = number | number[];

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async (employeeIds: number[], { dispatch }) => {
    try {
      const response = await api.deleteEmployeesFetch(employeeIds);
      const employeesByCompany = response.employees.reduce(
        (acc: Record<number, Employee[]>, employee: Employee) => {
          const companyId = employee.companyId;
          acc[companyId] = acc[companyId] || [];
          acc[companyId].push(employee);
          return acc;
        },
        {}
      );

      Object.entries(employeesByCompany).forEach(([companyId, employees]) => {
        dispatch(
          updateEmployeeCount({
            companyId: parseInt(companyId),
            employee_count: response.employee_count,
          })
        );
      });

      return employeeIds;
    } catch (error) {
      console.error('Error deleting employees:', error);
      throw error; 
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(loadEmployees.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const updatedEmployee = action.payload;
        const index = state.employees.findIndex(
          (employee) => employee.id === updatedEmployee.id
        );
        if (index !== -1) {
          state.employees[index] = updatedEmployee;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        console.error('Error updating employee:', action.error.message);
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        console.error('Error adding employee:', action.error.message);
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        const deletedEmployeeIds: DeleteEmployeePayload = action.payload;

        if (Array.isArray(deletedEmployeeIds)) {
          state.employees = state.employees.filter(
            (employee) => !deletedEmployeeIds.includes(employee.id)
          );
        } else {
          state.employees = state.employees.filter(
            (employee) => employee.id !== deletedEmployeeIds
          );
        }
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        console.error('Error deleting employee:', action.error.message);
      });
  },
});

export default employeeSlice.reducer;
