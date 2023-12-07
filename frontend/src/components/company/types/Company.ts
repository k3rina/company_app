export interface Company {
  id: number;
  name: string;
  employee_count: number;
  address: string;
}

export interface CompanyForm {
  id: number;
  name: string;
  address: string;
}

export interface AddCompany {
  name: string;
  address: string;
}
