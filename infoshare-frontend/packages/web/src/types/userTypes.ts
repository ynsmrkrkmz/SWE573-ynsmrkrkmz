import { BaseEntity } from 'types';

export type User = BaseEntity & {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  cellPhone?: string;
  birthdate?: string;
  isMfaActive: boolean; // Determines if MFA enrollment has been made.
  resetPasswordToken?: string;
  claims: string[];
};
