export interface Employee {
  id: number;
  companyId: number;
  firstName: string;
  lastName: string;
  position: string;
}
export interface EmployeeForm {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  companyName?: string;
}
export interface AddEmployee {
  firstName: string;
  lastName: string;
  position: string;
  companyName: string;
}
