import { Company, CompanyForm } from '../../components/company/types/Company';
import { Employee } from '../../components/employee/types/Employee';

export type Action =
  | { type: 'companies/load'; payload: Company[] }
  | { type: 'companies/update'; payload: CompanyForm }
  | { type: 'employees/load'; payload: Employee[] }
  | { type: 'employees/update'; payload: Employee }
  | { type: 'companies/add'; payload: Company }
  | { type: 'employees/add'; payload: Employee }
  | {
      type: 'companies/delete';
      payload: { company: Company; employees: Employee[] };
    }
  | {
      type: 'employees/delete';
      payload: { employee: Employee };
    }
  | {
      type: 'companies/updateEmployeeCount';
      payload: { id: number; employee_count: number };
    };
