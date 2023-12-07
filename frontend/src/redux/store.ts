import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import companySlice from '../components/company/companySlice';
import employeeSlice from '../components/employee/employeeSlice';

const store = configureStore({
  reducer: {
    companies: companySlice,
    employees: employeeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;

export type RootState = ReturnType<typeof store.getState>;
export default store;
