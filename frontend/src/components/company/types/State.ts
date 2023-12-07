import { Company } from './Company';

export type CompanyState = {
  companies: Company[];
  error: string | undefined;
};
