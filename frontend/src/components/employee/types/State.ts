import { Employee } from './Employee';

export type EmployeeState = {
  employees: Employee[];

  error: string | undefined;
};
