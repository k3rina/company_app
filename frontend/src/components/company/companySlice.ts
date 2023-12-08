import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../../App/api';
import { CompanyState } from './types/State';
import { AddCompany, CompanyForm } from './types/Company';

const initialState: CompanyState = {
  companies: [],
  error: undefined,
};

export const loadCompanies = createAsyncThunk('companies/load', () =>
  api.loadCompaniesFetch()
);

export const updateCompany = createAsyncThunk(
  'companies/update',
  async (updatedData: CompanyForm) => {
    return api.updateCompanyFetch(updatedData.id, updatedData);
  }
);

export const addCompany = createAsyncThunk(
  'companies/add',
  async (company: AddCompany) => {
    return api.addCompanyFetch(company);
  }
);

export const deleteCompanies = createAsyncThunk(
  'companies/delete',
  async (companyIds: number[]) => {
    await api.deleteCompaniesFetch(companyIds);
    return companyIds;
  }
);

export const updateEmployeeCount = createAction(
  'companies/updateEmployeeCount',
  (payload: { companyId: number; employee_count: number }) => ({
    payload,
  })
);

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
      })
      .addCase(loadCompanies.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const updatedCompany = action.payload;
        const index = state.companies.findIndex(
          (company) => company.id === updatedCompany.id
        );
        if (index !== -1) {
          state.companies[index] = updatedCompany;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        console.error('Error updating company:', action.error.message);
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      })
      .addCase(addCompany.rejected, (state, action) => {
        console.error('Error adding company:', action.error.message);
      })

      .addCase(deleteCompanies.fulfilled, (state, action) => {
        const deletedCompanyIds = action.payload;

        state.companies = state.companies.filter(
          (company) => !deletedCompanyIds.includes(company.id)
        );
      })

      .addCase(deleteCompanies.rejected, (state, action) => {
        console.error('Error deleting companies:', action.error.message);
      })
      .addCase(updateEmployeeCount, (state, action) => {
        const { companyId, employee_count } = action.payload;
        console.log(
          'Received updateEmployeeCount payload:',
          companyId,
          employee_count
        );

        const companyIndex = state.companies.findIndex(
          (c) => c.id === companyId
        );

        if (companyIndex !== -1) {
          state.companies = [
            ...state.companies.slice(0, companyIndex),
            { ...state.companies[companyIndex], employee_count },
            ...state.companies.slice(companyIndex + 1),
          ];

          console.log('Updated state:', state.companies);
        } else {
          console.log('Company not found for updateEmployeeCount:', companyId);
        }
      });
  },
});

export default companySlice.reducer;
